import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Download, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './Navigation.css';

interface NavigationProps {
  onOpenBrochure?: () => void;
}

const Navigation: React.FC<NavigationProps> = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookVisitClick = (e: React.MouseEvent) => {
    scrollToSection(e, 'enquiry');
    trackEvent('plot_size_select', { trigger: 'nav_cta' });
  };

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo / Wordmark */}
        <a 
          href="#hero" 
          className="nav-logo"
          onClick={(e) => scrollToSection(e, 'hero')}
          aria-label="Purandar Highlands - The Rise of New Pune"
        >
          <span className="logo-main">PURANDAR HIGHLANDS</span>
          <span className="logo-sub">THE RISE OF NEW PUNE</span>
        </a>

        {/* Desktop Curated Navigation Links */}
        <div className="nav-links">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.nav.about}</a>
          <a href="#heritage" onClick={(e) => scrollToSection(e, 'heritage')}>{t.nav.heritage}</a>
          <a href="#plots" onClick={(e) => scrollToSection(e, 'plots')}>{t.nav.plots}</a>
          <a href="#connectivity" onClick={(e) => scrollToSection(e, 'connectivity')}>{t.nav.connectivity}</a>
          <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>{t.nav.gallery}</a>
        </div>

        {/* Desktop Header Actions */}
        <div className="nav-cta">
          {/* Language Toggle Pill */}
          <button 
            type="button" 
            className="btn-lang"
            onClick={toggleLang}
            aria-label={`Switch language to ${lang === 'en' ? 'Marathi' : 'English'}`}
            title="Toggle English / Marathi"
          >
            <Globe size={14} className="globe-icon" />
            <span className="lang-label">{lang === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          {/* Direct Download Brochure Link (No Registration Required) */}
          <a
            href={ASSETS.documents.brochure}
            download="Purandar-Highlands-Brochure.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brochure-link"
            aria-label={t.nav.downloadBrochure}
            onClick={() => trackEvent('brochure_download', { source: 'nav_desktop' })}
          >
            <Download size={13} />
            <span>{t.nav.downloadBrochure}</span>
          </a>

          {/* Book Site Visit CTA */}
          <button 
            type="button"
            className="btn-enquire"
            onClick={handleBookVisitClick}
          >
            <Calendar size={13} className="btn-cal-icon" />
            <span>{t.nav.bookVisit}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} strokeWidth={1.75} /> : <Menu size={22} strokeWidth={1.75} />}
        </button>
      </div>

      {/* Mobile Drawer Dropdown */}
      <div className={`mobile-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-dropdown-inner">
          <nav className="mobile-nav-links" aria-label="Mobile Navigation">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.nav.about}</a>
            <a href="#heritage" onClick={(e) => scrollToSection(e, 'heritage')}>{t.nav.heritage}</a>
            <a href="#plots" onClick={(e) => scrollToSection(e, 'plots')}>{t.nav.plots}</a>
            <a href="#connectivity" onClick={(e) => scrollToSection(e, 'connectivity')}>{t.nav.connectivity}</a>
            <a href="#why-purandar" onClick={(e) => scrollToSection(e, 'why-purandar')}>{t.nav.whyUs}</a>
            <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')}>{t.nav.gallery}</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>{t.nav.faq}</a>
          </nav>

          <div className="mobile-actions-panel">
            <div className="mobile-action-row">
              <button 
                type="button" 
                className="btn-mobile-lang"
                onClick={toggleLang}
              >
                <Globe size={15} />
                <span>{lang === 'en' ? 'मराठी आवृत्ती' : 'English Version'}</span>
              </button>

              <a
                href={ASSETS.documents.brochure}
                download="Purandar-Highlands-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mobile-brochure"
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackEvent('brochure_download', { source: 'nav_mobile' });
                }}
              >
                <Download size={15} />
                <span>{t.hero.btnBrochure}</span>
              </a>
            </div>

            <button 
              type="button"
              className="btn-enquire mobile-btn"
              onClick={handleBookVisitClick}
            >
              <Calendar size={15} />
              <span>{t.nav.bookVisit}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
