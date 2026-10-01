import { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

import { heroScrollPercentage } from '../sections/Hero';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // The hero section pinning distance is dynamic based on total frames.
      // We trigger the solid navbar once the user scrolls past the hero sequence.
      setScrolled(window.scrollY > (window.innerHeight * heroScrollPercentage) / 100);
    };

    window.addEventListener('scroll', handleScroll);
    // Call it once on mount to set the correct initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    lenis?.scrollTo(`#${id}`, { duration: 1.5 });
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }}>
          <span>THE LAND</span>
        </div>

        <div className="nav-links">
          <a href="#overview" onClick={scrollToTop}>Overview</a>
          <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>A Closer Look</a>
          <a href="#characteristics" onClick={(e) => scrollToSection(e, 'characteristics')}>The Site</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>Residences & Pricing</a>
        </div>

        <div className="nav-cta">
          <button className="btn-enquire" onClick={(e) => scrollToSection(e, 'enquire')}>Enquire</button>
        </div>

        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-dropdown ${menuOpen ? 'open' : ''}`}>
        <a href="#overview" onClick={scrollToTop}>Overview</a>
        <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>A Closer Look</a>
        <a href="#characteristics" onClick={(e) => scrollToSection(e, 'characteristics')}>The Site</a>
        <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')}>Residences & Pricing</a>
        <button className="btn-enquire mobile-btn" onClick={(e) => scrollToSection(e, 'enquire')}>Enquire</button>
      </div>
    </nav>
  );
};

export default Navigation;
