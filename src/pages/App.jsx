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
import SkillsSection from '../components/SkillsSection'
import GithubActivity from '../components/GithubActivity'
import Projects from '../components/Projects'
import neuroguardImage from '../assets/neuroguard.png'
import idmsLogo from '../assets/idms_logo.jpg'
import csiLogo from '../assets/csi_logo.PNG'

import '../style/App.css'

const experiences = [
  {
    logo: idmsLogo,
    company: "IDMS Infotech",
    role: "Web Developer Intern",
    location: "Mumbai, Maharashtra, India",
    duration: "Jun 2025 – Sept 2025",
    bullets: [
      "Architected a full-stack MERN support dashboard, designing Node.js/Express RESTful APIs, managing MongoDB databases, and implementing Redux Toolkit.",
      "Delivered a custom e-commerce platform using Wix Studio and Velo (JavaScript), integrating third-party APIs to automate order fulfillment.",
      "Designed accessible, mobile-responsive interfaces using Figma and drove full-SDLC project deployment within an Agile environment."
    ],
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "JavaScript",
      "Wix Studio",
      "Figma"
    ],
  },
  {
    logo: csiLogo,
    company: "CSI (Computer Society Of India)",
    role: "Core Tech & Management Team Member",
    location: "Maharashtra, India",
    duration: "Aug 2025 – Jan 2026",
    bullets: [
      "Organized and successfully conducted a major technical event for 400+ students as an active member of the core decision and organizing team.",
      "Spearheaded marketing initiatives and successfully secured ₹15,000 in event funding through sponsorships."
    ],
    tech: ["Event Management", "Marketing", "Sponsorship Acquisition", "Cross-functional Leadership"],
  },
];

const projects = [
  {
    name: "Neuroguard",
    description: "this is project description",
    image: neuroguardImage,
    slug: "neuroguard"
  },
  {
    name: "Neuroguard",
    description: "this is project description",
    image: neuroguardImage,
    slug: "neuroguard"
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
            <a href="https://substack.com/@justanotherdork">Blogs</a>
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
        <div className="project-grid">
          {projects.map((exp, i) => (
            <Projects key={i} {...exp} />
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="Skills">
        <h3>Skills</h3>
        <SkillsSection />
      </div>

      <GithubActivity />

      {/* FOOTER */}
      <div className="Footer">
        <h3>Footer</h3>
      </div>
    </>
  )
}

export default App