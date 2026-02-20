import '../styles/Navigation.css';

interface NavigationProps {
  activeSection: string;
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'studies', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const appElement = document.querySelector('.app');
    if (element && appElement) {
      const elementTop = element.offsetTop;
      appElement.scrollTo({ top: elementTop, behavior: "smooth" });
    }
  };

  return (
    <nav className="navigation" >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`nav-item ${activeSection === section.id ? "active" : ""}`}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}

export default Navigation