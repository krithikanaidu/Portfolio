import { Link } from 'react-router-dom'
import { IoArrowBack } from 'react-icons/io5'
import LastFmStats from '../components/LastFmStats'
import '../style/MusicStats.css'

function MusicStats() {
  return (
    <div className="music-page">
      <Link to="/" className="music-back">
        <IoArrowBack /> Back
      </Link>

      <div className="music-page-header">
        <span className="music-vinyl" aria-hidden="true" />
        <div>
          <h1>On Repeat</h1>
          <p>A live look at what I'm listening to, courtesy of Last.fm.</p>
        </div>
      </div>

      <LastFmStats />
    </div>
  )
}

export default MusicStats