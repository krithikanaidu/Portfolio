import { Link } from 'react-router-dom'

function Projects({ name, description, image, slug }) {
    return (
        <Link to={`/projects/${slug}`} className="project-item">
                <div className="project-image">
                    <img src={image} alt={name} />
                </div>
                <div className="project-header">
                    {name}
                </div>
                <div className="project-description">
                    {description}
                </div>

        </Link>
    )
}

export default Projects
