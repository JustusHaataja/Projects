import '../styles/Studies.css';

const Studies = () => {
  return (
    <section className="studies-section">
      <div className="studies-container">
        <h1 className="studies-title">Education</h1>
        
        <div className="studies-content">
          <div className="study-card">
            <div className="study-header">
              <h2 className="institution">Tampere University</h2>
              <span className="period">2023 - 2026</span>
            </div>
            <h3 className="degree">BSc in Information Technology, Software Engineering</h3>
            <p className="description">
              Comprehensive software development program focusing on full-stack development, data structures, algorithms <br/> and modern software engineering practices. Gained hands-on experience with web technologies and agile methodologies.
            </p>
          </div>

          <div className="study-card">
            <div className="study-header">
              <h2 className="institution">University of Idaho, US</h2>
              <span className="period">2024</span>
            </div>
            <h3 className="degree">Exchange Semester</h3>
            <p className="description">
              International exchange program expanding technical knowledge and cultural perspectives.<br/> Studied advanced computer science topics while experiencing the American academic system and building cross-cultural collaboration skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Studies