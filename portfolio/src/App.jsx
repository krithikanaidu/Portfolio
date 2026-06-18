import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { MdNewspaper } from "react-icons/md";
import CursorSparks from './components/CursorSparks'
import './App.css'

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
            <a href="https://github.com/krithikanaidu">github</a>
            <a href="https://www.linkedin.com/in/krithika-naidu-9a400b299/">linkedin</a>
            <a href="">resume</a>
            <a href="mailto:krithikanaidu88@gmail.com">mail</a>
            <a href="https://substack.com/@justanotherdork">newsletter/substack</a>
          </div>
        </nav>

        {/* HERO */}
        <div className="hero">
          <div className="name">
            <p>Krithika Naidu</p>
          </div>
          <div className="tagline">
            <p>just a dorky developer</p>
          </div>
          <div className="bio">
            <p>an aspiring developer trying to build systems.</p>
          </div>
          <div className="links">
            <p><em>links paste here</em></p>
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

      </div>
    </div>

  )
}

export default App