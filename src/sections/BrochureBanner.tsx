import React from 'react';
import { FileText, Download, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './BrochureBanner.css';

interface BrochureBannerProps {
  onOpenBrochure?: () => void;
}

const BrochureBanner: React.FC<BrochureBannerProps> = () => {
  const { lang, t } = useLanguage();
  const isMarathi = lang === 'mr';

  const handleDownloadClick = () => {
    trackEvent('brochure_download', { source: 'mid_page_banner' });
  };

  return (
    <section className="brochure-section section-padding" id="brochure" aria-label="Project Brochure Download">
      <div className="section-container">
        <div className="brochure-card">
          <div className="brochure-card-glow" aria-hidden="true" />
          
          <div className="brochure-grid">
            {/* Visual Document Representation */}
            <div className="brochure-preview-col">
              <a 
                href={ASSETS.documents.brochure}
                download="Purandar-Highlands-Brochure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="brochure-cover-mockup"
                onClick={handleDownloadClick}
                aria-label="Download Purandar Highlands PDF Brochure"
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="mockup-border">
                  <div className="mockup-inner">
                    <span className="mockup-tag">NEW PUNE</span>
                    <h4 className="mockup-title">PURANDAR HIGHLANDS</h4>
                    <p className="mockup-tagline">The Rise of New Pune</p>
                    <div className="mockup-divider" />
                    <p className="mockup-specs">125 ACRES · AGRICULTURAL PLOTS</p>
                    <div className="mockup-badge">
                      <FileText size={16} />
                      <span>PDF · 1.3 MB</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Information & Direct Action */}
            <div className="brochure-text-col">
              <div className="section-eyebrow">
                {isMarathi ? 'माहितीपत्रक' : 'DOCUMENTATION'}
              </div>
              <h2 className="brochure-heading">
                {t.brochure.heading}
              </h2>
              <p className="brochure-desc">
                {t.brochure.subheading}
              </p>

              <div className="brochure-highlights">
                <div className="highlight-pill">
                  <ShieldCheck size={16} />
                  <span>{t.brochure.pill1}</span>
                </div>
                <div className="highlight-pill">
                  <ShieldCheck size={16} />
                  <span>{t.brochure.pill2}</span>
                </div>
                <div className="highlight-pill">
                  <ShieldCheck size={16} />
                  <span>{t.brochure.pill3}</span>
                </div>
              </div>

              <div className="brochure-actions">
                <a
                  href={ASSETS.documents.brochure}
                  download="Purandar-Highlands-Brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-brochure-open"
                  aria-label={t.brochure.button}
                  onClick={handleDownloadClick}
                >
                  <Download size={18} />
                  <span>{t.brochure.button}</span>
                  <ArrowRight size={16} />
                </a>
                <span className="brochure-note">
                  {isMarathi ? 'थेट झटपट PDF डाउनलोड · कोणतीही नोंदणी नाही' : 'Direct instant PDF download · No sign-up required'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrochureBanner;
