import { useState, useEffect } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [hasMistake, setHasMistake] = useState(false);
  
  const texts = ['Justus Haataja', 'Full-Stack Developer'];
  const mistakes = ['Justus Haastaja', 'Full-Stack Develper']; // Intentional typos
  
  // Find where the mistake starts
  const getMistakeIndex = (textIdx: number) => {
    const correct = texts[textIdx];
    const wrong = mistakes[textIdx];
    for (let i = 0; i < Math.min(correct.length, wrong.length); i++) {
      if (correct[i] !== wrong[i]) return i;
    }
    return Math.min(correct.length, wrong.length);
  };

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const currentText = hasMistake ? mistakes[textIndex] : texts[textIndex];
      const mistakeStartIndex = getMistakeIndex(textIndex);
      
      const timer = setTimeout(() => {
        if (!isDeleting && charIndex < currentText.length) {
          // Typing
          setDisplayedText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else if (!isDeleting && charIndex === currentText.length && hasMistake) {
          // Pause, then delete only to the mistake point
          setTimeout(() => setIsDeleting(true), 750);
        } else if (!isDeleting && charIndex === currentText.length && !hasMistake) {
          // Pause at end before deleting everything
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && hasMistake && charIndex > mistakeStartIndex) {
          // Delete only back to where mistake starts
          setDisplayedText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else if (isDeleting && hasMistake && charIndex === mistakeStartIndex) {
          // Now type the correct version from this point
          setIsDeleting(false);
          setHasMistake(false);
        } else if (isDeleting && !hasMistake && charIndex > 0) {
          // Delete everything
          setDisplayedText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else if (isDeleting && !hasMistake && charIndex === 0) {
          // Move to next text and introduce mistake
          setIsDeleting(false);
          setHasMistake(true);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }, isDeleting ? 100 : 150);

      return () => clearTimeout(timer);
    }, charIndex === 0 && textIndex === 0 && !isDeleting && hasMistake ? 1000 : 0);

    return () => clearTimeout(initialDelay);
  }, [charIndex, isDeleting, textIndex, hasMistake]);

  return (
    <div className="hero-container">
      <h1 className="hero-title">
        Hello, I'm <br/><span className="highlight typewriter">
          {displayedText}<span className="cursor">|</span></span>
      </h1>
    </div>
  );
};

export default Hero;