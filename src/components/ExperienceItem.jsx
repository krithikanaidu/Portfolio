function ExperienceItem({ logo, company, role, location, duration, bullets = [], tech = [] }) {
  return (
    <div className="exp-item">
      <div className="exp-header">
        <div className="exp-left">
          <img src={logo} alt={company} className="exp-logo" />
          <div>
            <p className="exp-company">{company}</p>
            <p className="exp-role">{role}</p>
          </div>
        </div>
        <div className="exp-right">
          <p className="exp-location">{location}</p>
          <p className="exp-duration">{duration}</p>
        </div>
      </div>

      <ul className="exp-bullets">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>

      <div className="exp-tags">
        {tech.map((t, i) => <span key={i} className="tech-badge">{t}</span>)}
      </div>
    </div>
  )
}

export default ExperienceItem