import { useEffect, useState } from 'react'
import { FaHeadphonesAlt } from 'react-icons/fa'

const API_KEY = import.meta.env.VITE_LASTFM_API_KEY
const USERNAME = import.meta.env.VITE_LASTFM_USERNAME
const CACHE_KEY = 'lastfm-stats-cache'
const CACHE_TTL = 15 * 60 * 1000 // 15 min

async function fetchLastFm(method, extraParams = '') {
  const res = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=${method}&user=${USERNAME}&api_key=${API_KEY}&format=json${extraParams}`
  )
  if (!res.ok) throw new Error('Last.fm request failed')
  return res.json()
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
      // Try cache first
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
        const [recentData, topArtistData, topAlbumData, infoData] = await Promise.all([
          fetchLastFm('user.getrecenttracks', '&limit=5'),
          fetchLastFm('user.gettopartists', '&period=7day&limit=5'),
          fetchLastFm('user.gettopalbums', '&period=overall&limit=5'),
          fetchLastFm('user.getinfo'),
        ])

        const tracks = recentData?.recenttracks?.track || []
        const nowPlayingTrack = tracks.find(t => t['@attr']?.nowplaying) || null
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

          <span className="lastfm-label lastfm-label-spaced">Top Albums (All Time)</span>
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
        </div>
      )}
    </div>
  )
}