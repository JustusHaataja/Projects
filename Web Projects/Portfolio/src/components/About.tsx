import '../styles/About.css';

const About = () => {
  const skills = [
    'React', 'TypeScript', 'Node.js', 'Express',
    'MongoDB', 'PostgreSQL', 'Git', 'Docker',
    'CSS3', 'HTML5', 'REST APIs', 'Vite'
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
            <div key={skill} className="skill-item">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About