import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './Footer.css';

interface FooterProps {
  onOpenPrivacy: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy }) => {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="section-container">
        
        <div className="footer-main-grid">
          
          {/* Brand & Developer Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo-box">
              <img 
                src="/logo.svg" 
                alt="Purandar Highlands" 
                className="footer-logo-img"
                width="220"
                height="50"
              />
            </div>
            <p className="footer-brand-subtitle">
              {t.footer.brandDesc}
            </p>
            <div className="footer-badge">
              <ShieldCheck size={16} />
              <span>{t.footer.disclaimer}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact & Office</h4>
            <ul className="footer-info-list">
              <li>
                <MapPin size={17} className="f-icon" />
                <span>Marketyard, Pune, Maharashtra</span>
              </li>
              <li>
                <Clock size={17} className="f-icon" />
                <span>{t.footer.contactPerson}</span>
              </li>
              <li>
                <Phone size={17} className="f-icon" />
                <a 
                  href={ASSETS.links.call}
                  onClick={() => trackEvent('call_click', { source: 'footer' })}
                >
                  +91-9028986499
                </a>
              </li>
              <li>
                <Mail size={17} className="f-icon" />
                <a href="mailto:newpune712@gmail.com">
                  newpune712@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Project & Legal</h4>
            <ul className="footer-nav-list">
              <li>
                <a 
                  href={ASSETS.links.maps} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-map-link"
                  onClick={() => trackEvent('get_directions_click', { source: 'footer' })}
                >
                  <span>{t.footer.googleMaps}</span>
                  <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="#about">{t.nav.about}</a>
              </li>
              <li>
                <a href="#plots">{t.nav.plots}</a>
              </li>
              <li>
                <a href="#connectivity">{t.nav.connectivity}</a>
              </li>
              <li>
                <button 
                  type="button" 
                  className="btn-text-link"
                  onClick={onOpenPrivacy}
                >
                  {t.footer.privacyPolicy}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
          <div className="footer-sub-links">
            <button 
              type="button" 
              className="btn-text-link-small"
              onClick={onOpenPrivacy}
            >
              {t.footer.privacyPolicy}
            </button>
            <span className="dot-sep">·</span>
            <span className="developer-tag">Purandar Highlands by New Pune</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
