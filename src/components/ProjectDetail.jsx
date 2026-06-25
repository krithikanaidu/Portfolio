import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa"
import { IoDocumentAttachSharp, IoOpenOutline } from "react-icons/io5"
import { projects } from '../data/project'
import '../style/ProjectDetail.css'

function ProjectDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()

    const index = projects.findIndex((p) => p.slug === slug)
    const project = projects[index]



    if (!project) {
        return (
            <div className="project-detail">

                <p>Project not found.</p>
                <Link to="/">Back home</Link>
            </div>
        )
    }

    const nextProject = projects[(index + 1) % projects.length]
    const isOnlyProject = projects.length <= 1

    const ActionButtons = () => (
        <div className="project-links">
            {project.links?.live && (
                <a className="link-button primary" href={project.links.live} target="_blank" rel="noreferrer">
                    <IoOpenOutline /> View Project
                </a>
            )}
            {project.links?.github && (
                <a className="link-button" href={project.links.github} target="_blank" rel="noreferrer">
                    <FaGithub /> Github
                </a>
            )}
            {project.links?.ppt && (
                <a className="link-button" href={project.links.ppt} target="_blank" rel="noreferrer">
                    <IoDocumentAttachSharp /> Slides
                </a>
            )}
        </div>
    )

    return (
        <div className="project-detail">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-bio">{project.bio}</p>

            <div className="tags">
                {project.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                ))}
            </div>

            <div className="project-detail-image-wrapper">
                <img src={project.image} alt={project.title} className="project-detail-image" />
            </div>

            <ActionButtons />

            <section className="project-section">
                <h2 className="section-title">Overview</h2>

                {project.overview.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </section>

            <section className="project-section">
                <h2 className="section-title">Problem</h2>
                {project.problem.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </section>

            <section className="project-section">
                <h2 className="section-title">Constraints</h2>
                <ul className="bullet-list">
                    {project.constraints.map((c, i) => (
                        <li key={i}>
                            <strong>{c.label}</strong>  {c.text}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="project-section">
                <h2 className="section-title">Key Engineering Decisions</h2>
                <ul>{project.keyDecisions.map((r, i) => <li key={i}>{r}<br /><br /></li>)}
                </ul>
            </section>

            <section className="project-section">
                <h2 className="section-title">Results</h2>
                <ul className="bullet-list plain">
                    {project.results.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </section>

            <section className="project-section">
                <h2 className="section-title">Takeaways</h2>
                <ul className="bullet-list plain">
                    {project.takeaways.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </section>

            <ActionButtons />

            {!isOnlyProject && (
                <button className="next-project-card" onClick={() => navigate(`/projects/${nextProject.slug}`)}>
                    <span className="next-label">Next →</span>
                    <span className="next-title">{nextProject.title}</span>
                </button>
            )}

            <Link to="/" className="see-all-link">See all Projects</Link>
        </div>
    )
}

export default ProjectDetail