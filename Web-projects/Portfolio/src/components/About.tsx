import '../styles/About.css';

interface Skill {
  name: string;
  icon: string;
}

const About = () => {
  const skills: Skill[] = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg' },
    { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  ];

  return (
    <div className="about-container">
      <h2 className="about-title">About Me</h2>
      <div className="about-content">
        <p className="about-text">
          I'm a passionate full-stack developer with expertise in building modern web applications.
          I love creating efficient, scalable, and user-friendly solutions that make a difference.
        </p>
        <p className="about-text">
          With a strong foundation in both frontend and backend technologies, I bring ideas to life
          through clean code and thoughtful design.
        </p>
      </div>
      <div className="skills-section">
        <h3 className="skills-title">Skills & Technologies</h3>
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <img 
                src={skill.icon} 
                alt={skill.name} 
                className={skill.name === 'GitHub' ? 'skill-icon light' : 'skill-icon'} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About