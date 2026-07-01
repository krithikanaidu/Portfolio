import { useEffect, useState } from 'react'
import { FaHeadphonesAlt } from 'react-icons/fa'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const USERNAME = import.meta.env.VITE_LASTFM_USERNAME
const CACHE_TTL = 15 * 60 * 1000 // 15 min

// ─── SINGLE SOURCE OF TRUTH FOR TIME RANGE ─────────────────────
// Change ONLY this value to change the range for both Top Artists
// and Top Albums. Valid Last.fm values (this is a Last.fm API
// requirement, not something we can invent our own strings for):
//   'overall' | '7day' | '1month' | '3month' | '6month' | '12month'
const PERIOD = '7day'

// Human-readable label shown in the UI, derived from PERIOD so the
// heading text can never drift out of sync with the actual data.
const PERIOD_LABELS = {
  overall: 'All Time',
  '7day': 'Last 7 Days',
  '1month': 'Last Month',
  '3month': 'Last 3 Months',
  '6month': 'Last 6 Months',
  '12month': 'Last Year',
}
const PERIOD_LABEL = PERIOD_LABELS[PERIOD] ?? PERIOD

// Cache key includes the period so that flipping PERIOD during
// development always fetches fresh data instead of silently
// serving you stale cached results from a previous period.
const CACHE_KEY = `lastfm-stats-cache-${PERIOD}`

async function fetchLastFm(method, extraParams = '') {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${USERNAME}&api_key=${API_KEY}&format=json${extraParams}`
  )
  if (!res.ok) throw new Error('Last.fm request failed')
  return res.json()
}

// ─── ARTIST AVATAR FALLBACK ─────────────────────────────────────
// Last.fm's user.gettopartists (and artist.getInfo/search) has returned
// a generic gray placeholder star instead of real artist photos for
// years — this is a known, unfixed issue on Last.fm's side, not
// something wrong in this code. Pulling real photos would mean a
// third-party API (Deezer blocks direct browser calls via CORS;
// TheAudioDB's CORS support and free-tier reliability aren't solid
// enough to depend on for a live site), so instead we generate a
// simple colored initials avatar — no network call, never breaks.
const AVATAR_COLORS = ['#e3d473', '#d72e2e', '#0e5047', '#22153c', '#1d2923']

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]?.toUpperCase())
    .join('')
}

// Deterministic color per artist name, so the same artist always
// gets the same color across renders/reloads (not random each time).
function getAvatarColor(name = '') {
  const hash = [...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}
export default function LastFmStats() {
  const [recent, setRecent] = useState([])
  const [topArtists, setTopArtists] = useState([])
  const [topAlbums, setTopAlbums] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [nowPlaying, setNowPlaying] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      // Try cache first. Note: CACHE_KEY includes PERIOD, so this only
      // ever reads a cache written for the *current* PERIOD — changing
      // PERIOD above always triggers a fresh fetch instead of showing
      // you leftover data from whatever period you tested last.
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) {
        try {
          const parsed = JSON.parse(cached)
          if (Date.now() - parsed.timestamp < CACHE_TTL) {
            if (!cancelled) {
              setRecent(parsed.recent)
              setTopArtists(parsed.topArtists)
              setTopAlbums(parsed.topAlbums)
              setUserInfo(parsed.userInfo)
              setNowPlaying(parsed.nowPlaying)
              setLoading(false)
            }
            return
          }
        } catch {
          // ignore corrupt cache
        }
      }

    try {
        // BUG FIX: both calls now use the same PERIOD constant.
        // Previously topAlbums used '&period=7' which isn't a valid
        // Last.fm value (only 'overall' | '7day' | '1month' | ... are
        // accepted) — Last.fm was silently ignoring it and returning
        // all-time data no matter what you set.
        const [recentData, topArtistData, topAlbumData, infoData] = await Promise.all([
          fetchLastFm('user.getrecenttracks', '&limit=5'),
          fetchLastFm('user.gettopartists', `&period=${PERIOD}&limit=10`),
          fetchLastFm('user.gettopalbums', `&period=${PERIOD}&limit=10`),
          fetchLastFm('user.getinfo'),
        ])

        const tracks = recentData?.recenttracks?.track || []
        // Note: "now playing" isn't set here. It's handled by the separate
        // pollNowPlaying effect below, which refreshes every 30s so the
        // "Now Playing" card feels live instead of being stuck at 15-min
        // cache staleness like the rest of this data.
        const recentTracks = tracks
          .filter(t => !t['@attr']?.nowplaying)
          .slice(0, 5)

        const artists = topArtistData?.topartists?.artist || []
        const albums = topAlbumData?.topalbums?.album || []
        const info = infoData?.user || null

        if (!cancelled) {
          setRecent(recentTracks)
          setTopArtists(artists)
          setTopAlbums(albums)
          setUserInfo(info)
          setLoading(false)
        }

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            recent: recentTracks,
            topArtists: artists,
            topAlbums: albums,
            userInfo: info,
          })
        )
      } catch (err) {
        if (!cancelled) {
          setError(true)
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  // Poll now-playing separately — this should feel live, not cached
  useEffect(() => {
    let cancelled = false

    async function pollNowPlaying() {
      try {
        const data = await fetchLastFm('user.getrecenttracks', '&limit=1')
        const tracks = data?.recenttracks?.track || []
        const current = tracks.find(t => t['@attr']?.nowplaying) || null
        if (!cancelled) {
          setNowPlaying(current)
        }
      } catch {
        // silent — don't disrupt the rest of the UI on a failed poll
      }
    }

    pollNowPlaying()
    const interval = setInterval(pollNowPlaying, 30000) // 30s

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  if (error) return null // fail silently, don't break the page
  if (loading) {
    return (
      <div className="LastFm">
        <h3>Listening To</h3>
        <div className="lastfm-skeleton" />
      </div>
    )
  }

  return (
    <div className="LastFm">
      <h3>Listening To</h3>

      {nowPlaying && (
        <a
          className="lastfm-nowplaying"
          href={nowPlaying.url}
          target="_blank"
          rel="noreferrer"
        >
          <img src={nowPlaying.image?.[1]?.['#text']} alt="" />
          <div className="lastfm-nowplaying-info">
            <span className="lastfm-pulse">
              <FaHeadphonesAlt /> Now playing
            </span>
            <p className="lastfm-track">{nowPlaying.name}</p>
            <p className="lastfm-artist">{nowPlaying.artist?.['#text']}</p>
          </div>
        </a>
      )}

      <div className="lastfm-grid">
        <div className="lastfm-col">
          <span className="lastfm-label">Recent Tracks</span>
          <ul className="lastfm-list">
            {recent.map((t, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <a href={t.url} target="_blank" rel="noreferrer">
                  <span className="lastfm-track-name">{t.name}</span>
                  <span className="lastfm-track-artist">{t.artist?.['#text']}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

       </div>

      {userInfo && (
        <div className="lastfm-overall">
          <span className="lastfm-label">Overall</span>
          <div className="lastfm-overall-stats">
            <div className="lastfm-stat">
              <span className="lastfm-stat-value">
                {Number(userInfo.playcount).toLocaleString()}
              </span>
              <span className="lastfm-stat-label">Scrobbles</span>
            </div>
            <div className="lastfm-stat">
              <span className="lastfm-stat-value">
                {userInfo.registered?.unixtime
                  ? new Date(userInfo.registered.unixtime * 1000).getFullYear()
                  : '—'}
              </span>
              <span className="lastfm-stat-label">Since</span>
            </div>
          </div>

          <span className="lastfm-label lastfm-label-spaced">Top Albums ({PERIOD_LABEL})</span>
          <ul className="lastfm-album-grid">
            {topAlbums.map((al, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <a href={al.url} target="_blank" rel="noreferrer">
                  <img src={al.image?.[2]?.['#text']} alt="" />
                  <div className="lastfm-album-info">
                    <span className="lastfm-track-name">{al.name}</span>
                    <span className="lastfm-track-artist">{al.artist?.name}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <span className="lastfm-label lastfm-label-spaced">Top Artists ({PERIOD_LABEL})</span>
          <ul className="lastfm-artist-grid">
            {topArtists.map((ar, i) => (
              <li key={i} style={{ animationDelay: `${i * 60}ms` }}>
                <a href={ar.url} target="_blank" rel="noreferrer">
                  {/* Using a generated initials avatar instead of ar.image —
                      see the AVATAR FALLBACK comment near the top of this
                      file for why Last.fm's artist images can't be used. */}
                  <div
                    className="lastfm-artist-avatar"
                    style={{ background: getAvatarColor(ar.name) }}
                  >
                    {getInitials(ar.name)}
                  </div>
                  <div className="lastfm-artist-info">
                    <span className="lastfm-artist">{ar.name}</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}