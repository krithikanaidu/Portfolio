import { Link } from 'react-router-dom'

function Projects({ title, bio, image, slug }) {
    return (
        <Link to={`/projects/${slug}`} className="project-item">
            <div className="project-image">
                <img src={image} alt={title} />
            </div>
            <div className="project-header">
                {title}
            </div>
            <div className="project-description">
                {bio}
            </div>
        </Link>
    )
}

export default Projects