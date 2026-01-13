import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-description">
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <div className="contact-links">
        <a href="mailto:justus.haataja@hotmail.com" className="contact-link">
          <FontAwesomeIcon icon={faEnvelope} className="link-icon" />
          Email
        </a>
        <a href="https://github.com/JustusHaataja/Projects" className="contact-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faSquareGithub} className="link-icon" />
          GitHub
        </a>
        <a href="https://linkedin.com/in/justushaataja" className="contact-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="link-icon" />
          LinkedIn
        </a>
      </div>
    </div>
  )
}

export default Contact