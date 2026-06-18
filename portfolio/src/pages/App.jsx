import { Routes, Route } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { MdNewspaper } from "react-icons/md";
import { Link } from 'react-router-dom'
import CursorSparks from '../components/CursorSparks'
import GetInTouch from '../pages/GetInTouch'
import '../style/App.css'

function App() {
  return (
    <div className="main">
      <CursorSparks />
      <div className="center">

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="navbar-left">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#blogs">Blogs</a>
          </div>
          <div className="navbar-right">
            <a href="https://github.com/krithikanaidu" title="Github"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/krithika-naidu-9a400b299/" title="LinkedIn"><FaLinkedin /></a>
            <a href="" title="Resume"><IoDocumentAttachSharp /></a>
            <a href="mailto:krithikanaidu88@gmail.com" title="Mail"><IoMail /></a>
            <a href="https://substack.com/@justanotherdork" title="Newsletter"><MdNewspaper /></a>
          </div>
        </nav>

        {/* ROUTES */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<GetInTouch />} />
        </Routes>

      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="name">
          <p>Krithika Naidu</p>
        </div>
        <div className="tagline">
          <p>just a dorky developer</p>
        </div>
        <div className="bio">
          <p>Soon-to-be CS grad who likes building things and untangling complex bugs. Off-screen you'll find me volunteering or experimenting with live-coding music.</p>
        </div>
        <div className="links">
          <a href="#resume"><IoDocumentAttachSharp /> Resume</a>
          <Link to="/contact"><IoMail /> Get in touch</Link>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="Experience">
        <h3>Experience</h3>
      </div>

      {/* PROJECTS */}
      <div className="Projects">
        <h3>Projects</h3>
      </div>

      {/* SKILLS */}
      <div className="Skills">
        <h3>Skills</h3>
      </div>

      {/* FOOTER */}
      <div className="Footer">
        <h3>Footer</h3>
      </div>
    </>
  )
}

export default App