import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Project One',
      description: 'A full-stack web application built with React and Node.js',
      technologies: ['React', 'Node.js', 'MongoDB'],
      liveLink: '#',
      githubLink: '#'
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Modern e-commerce platform with payment integration',
      technologies: ['TypeScript', 'Express', 'PostgreSQL'],
      liveLink: '#',
      githubLink: '#'
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Real-time chat application with WebSocket support',
      technologies: ['React', 'Socket.io', 'Redis'],
      liveLink: '#',
      githubLink: '#'
    }
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
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
        ))}
      </div>
    </div>
  );
};

export default Projects