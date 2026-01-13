import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveLink?: string;
  githubLink?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce platform',
      description: 'Full-stack e-commerce platform featuring real product listings, shopping cart functionality. Built with modern web technologies and a PostgreSQL database for efficient data management.',
      technologies: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
      image: '/E-commerce_preview.png',
      liveLink: 'https://puhdistamo.netlify.app/',
      githubLink: 'https://github.com/JustusHaataja/Projects/tree/main/Web%20Projects/E-commerce'
    },
    {
      id: 2,
      title: 'Algorithm visualizer',
      description: 'Interactive web application that visualizes popular sorting algorithms in real-time. Features customizable array sizes, and step-by-step execution to help understand algorithmic concepts.',
      technologies: ['React', 'TypeScript', 'Python'],
      image: '/Algorithms_preview.png',
      liveLink: 'https://algorithmsbyjustus.netlify.app/',
      githubLink: 'https://github.com/JustusHaataja/Projects/tree/main/Web%20Projects/Sorting%20Algorithms'
    },
    {
      id: 3,
      title: 'Movie website',
      description: 'Dynamic movie discovery platform utilizing external APIs to fetch and display movie information. Features search functionality, detailed movie pages.',
      technologies: ['React', 'TypeScript'],
      image: '/MovieApp_preview.png',
      liveLink: 'https://movies-by-justus.netlify.app/',
      githubLink: 'https://github.com/JustusHaataja/Projects/tree/main/Web%20Projects/MovieApp'
    }
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                {project.liveLink && (
                  <a href={project.liveLink} className="project-link" target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} className="project-link" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects