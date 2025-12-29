import { useState, useEffect } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  
  const texts = ['Justus Haataja', 'Full-Stack Developer'];

  useEffect(() => {
    // Wait 1 second before starting typewriter
    const initialDelay = setTimeout(() => {
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
      }, isDeleting ? 150 : 250);

      return () => clearTimeout(timer);
    }, charIndex === 0 && textIndex === 0 && !isDeleting ? 1000 : 0);

    return () => clearTimeout(initialDelay);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className="hero-container">
      <h1 className="hero-title">
        Hello, I'm <br/><span className="highlight typewriter">{displayedText}<span className="cursor">|</span></span>
      </h1>
      <p className="hero-description">
        Crafting beautiful and functional web experiences with modern technologies
      </p>
      <div className="hero-cta">
        <button 
          className="cta-button primary"
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          View My Work
        </button>
        <button 
          className="cta-button secondary"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get In Touch
        </button>
      </div>
    </div>
  );
};

export default Hero