import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import '../styles/About.css';

const About = () => {
  const skills = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
  ];

  const additionalSkills = [
    { 
      name: 'Version Control', 
      icon: <FontAwesomeIcon icon={faCodeBranch} />,
      description: 'Proficient with Git workflows, branching strategies, and collaborative development using GitHub.'
    },
    { 
      name: 'REST API', 
      icon: '/API.svg',
      description: 'Experience designing and consuming RESTful APIs, including authentication, error handling, and best practices.'
    },
    { 
      name: 'AI Tools', 
      icon: '/githubcopilot.svg',
      description: 'Leveraging AI-powered tools like GitHub Copilot and ChatGPT to enhance productivity and code quality.'
    },
    { 
      name: 'Team Work', 
      icon: <FontAwesomeIcon icon={faUsers} />,
      description: 'Strong collaboration skills with experience in Agile methodologies, code reviews, and cross-functional teams.'
    },
  ];

  return (
    <div className="about-container">
      <h2 className="about-title">Skills</h2>
      
      <div className="additional-skills">
        {additionalSkills.map((skill) => (
          <div key={skill.name} className="additional-skill-item">
            <div className="skill-icon-wrapper">
              {typeof skill.icon === 'string' ? (
                <img src={skill.icon} alt={skill.name} className="additional-skill-icon" />
              ) : (
                <span className="additional-skill-icon">{skill.icon}</span>
              )}
            </div>
            <div className="skill-description">
              <p><strong>{skill.name}</strong><br/>{skill.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="skills-section">
        <h3 className="skills-title">Technologies</h3>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={skill.name === "GitHub" ? "skill-icon light" : "skill-icon"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About