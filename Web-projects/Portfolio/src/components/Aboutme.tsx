import '../styles/Aboutme.css';

const Aboutme = () => {
	return (
		<div className="aboutme-container">
			<h2 className = "aboutme-title">About Me</h2>

			<div className="aboutme-grid">
				<article className="aboutme-card">
                    <h3>Location</h3>
                    <p>
                        Based in Tampere, Finland. Software engineering student at Tampere University,
                        graduating in May 2026 and open to developer opportunities.
                    </p>
                </article>

                <article className="aboutme-card">
                    <h3>Experience</h3>
                    <p>
                        I build full-stack web applications using Python, FastAPI, TypeScript, React
                        and PostgreSQL. My work includes designing REST APIs, building modern
                        frontends, and deploying applications to cloud environments.
                    </p>
                </article>

                <article className="aboutme-card aboutme-card-wide">
                    <h3>How I work</h3>
                    <p>
                        I focus on practical, end-to-end solutions. Comfortable working with Git,
                        CI/CD, Docker and modern development workflows in both solo projects and
                        team environments.
                    </p>
                </article>
			</div>
		</div>
	);
};

export default Aboutme;
