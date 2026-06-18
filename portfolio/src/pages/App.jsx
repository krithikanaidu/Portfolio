import { Routes, Route } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { MdNewspaper } from "react-icons/md";
import { Link } from 'react-router-dom'
import CursorSparks from '../components/CursorSparks'
import GetInTouch from '../pages/GetInTouch'
import ExperienceItem from '../components/ExperienceItem'
import idmsLogo from '../assets/idms_logo.jpg'
import csiLogo from '../assets/csi_logo.PNG'
import '../style/App.css'

  const experiences = [
    {
      logo: idmsLogo,
      company: "IDMS",
      role: "Developer",
      location: "Maharashtra, India",
      duration: "Jun 2025 – Sep 2025",
      bullets: [
        "Built a real-time multi-player streaming service integrated with VR headsets.",
        "Worked on TCP based Gateway for data transfer from ESP32 to VR headset.",
      ],
      tech: ["Python", "FastAPI", "Node.js / Express.js", "TypeScript", "PostgreSQL", "WebSockets", "WebRTC", "SQLite"],
    },
    {
      logo: csiLogo,
      company: "CSI (Computers Society Of India)",
      role: "Commitee Member / Finance Team",
      location: "Maharashtra, India",
      duration: "Aug 2025 – Jan 2026",
      bullets: [],
      tech: [],
    },
  ]


function App() {


  return (
    <div className="main">
      <CursorSparks />
      <div className="center">

        {/* NAVBAR */}
        <nav className="navbar">
          <div className="navbar-left">
            <a href="/">Home</a>
            <a href="/">Projects</a>
            <a href="/">Blogs</a>
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
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} {...exp} />
        ))}
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