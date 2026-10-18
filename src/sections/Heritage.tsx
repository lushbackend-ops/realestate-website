import React from 'react';
import { ShieldCheck, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import './Heritage.css';

const Heritage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="heritage" className="heritage-section section-padding" aria-label="Historic Heritage of Purandar Fort">
      <div className="section-container">
        
        {/* Heritage Header */}
        <div className="heritage-header">
          <span className="eyebrow">{t.heritage.label}</span>
          <h2 className="heritage-heading">{t.heritage.heading}</h2>
        </div>

        {/* Hero Visual: Authentic Horizon View of Historic Purandar */}
        <div className="heritage-hero-visual">
          <div className="heritage-image-wrapper">
            <img 
              src={ASSETS.images.landscape} 
              alt="Historic Purandar Fort and Sahyadri horizon as seen from Purandar Highlands" 
              className="heritage-main-img"
              loading="lazy"
              decoding="async"
              width="1200"
              height="675"
            />
            <div className="heritage-floating-badge">
              <Compass size={18} className="badge-icon" />
              <span>{t.heritage.fortBadge}</span>
            </div>
          </div>
        </div>

        {/* Heritage Narrative Text & Birthplace Tribute */}
        <div className="heritage-narrative-box">
          <div className="narrative-content">
            <p className="narrative-lead">{t.heritage.paragraph1}</p>
            <p className="narrative-body">{t.heritage.paragraph2}</p>
          </div>
          <div className="heritage-history-pill">
            <ShieldCheck size={20} className="pill-icon" />
            <div>
              <strong>Birthplace of Chhatrapati Sambhaji Maharaj</strong>
              <p>Honouring Maratha heritage through authentic, nature-preserved land.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Heritage;
