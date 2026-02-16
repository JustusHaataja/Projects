import { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import Studies from './components/Studies';
import BackgroundVideo from './components/BackgroundVideo';
import './styles/App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sectionOpacities, setSectionOpacities] = useState({
    hero: 1,
    about: 1,
    projects: 1,
    studies: 1,
    contact: 1
  });
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'studies', 'contact'];
      const newOpacities: { [key: string]: number } = {};

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          // Check if section top is close to viewport top (within 100px tolerance)
          if (rect.top >= -100 && rect.top <= 100) {
            setActiveSection(sectionId);
          }

          // Calculate opacity based on position
          if (rect.top >= 0 && rect.top <= viewportHeight * 0.3) {
            // Section is at top - fully visible
            newOpacities[sectionId] = 1;
          } else if (rect.top > viewportHeight * 0.3 && rect.top < viewportHeight) {
            // Section is entering from bottom - fade in
            const fadeInProgress = (viewportHeight - rect.top) / (viewportHeight * 0.7);
            newOpacities[sectionId] = Math.max(0, Math.min(1, fadeInProgress));
          } else if (rect.top < 0 && rect.bottom > 0) {
            // Section is scrolling out from top - fade out
            const scrollProgress = Math.abs(rect.top) / (viewportHeight * 0.5);
            newOpacities[sectionId] = Math.max(0, 1 - scrollProgress);
          } else {
            // Section is completely out of view
            newOpacities[sectionId] = 0;
          }
        }
      }

      setSectionOpacities(newOpacities as never);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const appElement = appRef.current;
    if (appElement) {
      appElement.addEventListener('scroll', handleScroll);
      // Call once on mount to set initial state
      handleScroll();
    }
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (appElement) {
        appElement.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      <BackgroundVideo />
      <div 
        className="cursor-light"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      <Navigation activeSection={activeSection} />
      <section id="hero" className="section" style={{ opacity: sectionOpacities.hero }}>
        <Hero />
      </section>
      <section id="about" className="section" style={{ opacity: sectionOpacities.about }}>
        <About />
      </section>
      <section id="projects" className="section" style={{ opacity: sectionOpacities.projects }}>
        <Projects />
      </section>
      <section id="studies" className="section" style={{ opacity: sectionOpacities.studies }}>
        <Studies />
      </section>
      <section id="contact" className="section" style={{ opacity: sectionOpacities.contact }}>
        <Contact />
      </section>
    </div>
  )
}

export default App