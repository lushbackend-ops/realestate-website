import React from 'react';
import { Mountain, Wind, Navigation, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './WhyPurandar.css';

const WhyPurandar: React.FC = () => {
  const { t } = useLanguage();

  const renderIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Mountain size={28} strokeWidth={1.5} />;
      case 1: return <Wind size={28} strokeWidth={1.5} />;
      case 2: return <Navigation size={28} strokeWidth={1.5} />;
      case 3: return <Layers size={28} strokeWidth={1.5} />;
      default: return <Mountain size={28} strokeWidth={1.5} />;
    }
  };

  return (
    <section id="why-purandar" className="why-section section-padding" aria-label="Why Choose Purandar Highlands">
      <div className="section-container">
        
        <div className="why-header">
          <span className="eyebrow">{t.whyUs.label}</span>
          <h2 className="why-heading">{t.whyUs.heading}</h2>
        </div>

        <div className="why-cards-grid">
          {t.whyUs.cards.map((card, idx) => (
            <div key={card.title} className="why-card">
              <div className="why-icon-box" aria-hidden="true">
                {renderIcon(idx)}
              </div>
              <h3 className="why-card-title">{card.title}</h3>
              <p className="why-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyPurandar;
