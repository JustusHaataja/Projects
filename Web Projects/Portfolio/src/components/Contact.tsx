import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-description">
        I'm always open to new opportunities and collaborations. Feel free to reach out!
      </p>
      <div className="contact-links">
        <a href="mailto:your.email@example.com" className="contact-link">
          <span className="link-icon">✉️</span>
          Email
        </a>
        <a href="https://github.com/yourusername" className="contact-link" target="_blank" rel="noopener noreferrer">
          <span className="link-icon">💻</span>
          GitHub
        </a>
        <a href="https://linkedin.com/in/yourusername" className="contact-link" target="_blank" rel="noopener noreferrer">
          <span className="link-icon">💼</span>
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Contact