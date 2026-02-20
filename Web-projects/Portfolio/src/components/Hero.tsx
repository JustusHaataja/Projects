import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faSquareLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/Hero.css';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  const texts = ['Justus Haataja', 'Full-Stack Developer'];

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.querySelector('.hero-title');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const threshold = windowHeight * 0.2; // 20% from top
        
        if (rect.top <= threshold) {
          // Calculate opacity based on how far past the threshold
          const fadeDistance = threshold;
          const opacity = Math.max(0, Math.min(1, rect.top / fadeDistance));
          setScrollOpacity(opacity);
        } else {
          setScrollOpacity(1);
        }
      }
    };

    const appElement = document.querySelector('.app');
    if (appElement) {
      appElement.addEventListener('scroll', handleScroll);
      return () => appElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        // Typing
        setDisplayedText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        // Pause at end before deleting
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setDisplayedText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        // Move to next text
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % texts.length);
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, isDeleting, textIndex]);

  return (
    <div className="hero-container" style={{ opacity: scrollOpacity }}>
      <h1 className="hero-title" >
        <span className="hero-header" >Hello, I'm</span> <br/>
        <span className="highlight typewriter" >
          {displayedText}<span className="cursor" >|</span>
        </span>
      </h1>
      <div className="social-links" style={{ opacity: scrollOpacity }} >
        <a 
          href="https://github.com/JustusHaataja/Projects" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faSquareGithub} size="3x" />
        </a>
        <a 
          href="https://www.linkedin.com/in/justushaataja/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="social-link"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faSquareLinkedin} size="3x" />
        </a>
      </div>
    </div>
  )
}

export default Hero