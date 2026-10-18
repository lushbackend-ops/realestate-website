import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import './About.css';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section section-padding" aria-label="About Purandar Highlands">
      <div className="section-container">
        <div className="about-grid">
          
          {/* Text Content Column */}
          <div className="about-text-col">
            <span className="eyebrow">{t.about.label}</span>
            <h2 className="about-heading">{t.about.heading}</h2>

            <div className="about-paragraphs">
              <p className="lead-paragraph">{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
              <p>{t.about.paragraph3}</p>
            </div>

            <div className="about-stat-strip">
              <div className="stat-item">
                <span className="stat-val">125</span>
                <span className="stat-lbl">Acres of Open Countryside</span>
              </div>
              <div className="stat-item">
                <span className="stat-val">45</span>
                <span className="stat-lbl">Minutes from Swargate, Pune</span>
              </div>
            </div>
          </div>

          {/* Visual Photograph Column */}
          <div className="about-visual-col">
            <div className="about-image-wrapper">
              <img 
                src={ASSETS.images.site} 
                alt="Purandar Highlands lush green agricultural land" 
                className="about-img"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="about-caption-box">
                <span className="caption-gold-line" />
                <span className="caption-text">Purandar Highlands Site Perspective</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
