import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Faq.css';

const Faq: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item expanded by default

  const toggleItem = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className="faq-section section-padding" aria-label="Frequently Asked Questions">
      <div className="section-container">
        
        <div className="faq-header">
          <span className="eyebrow">{t.faq.label}</span>
          <h2 className="faq-heading">{t.faq.heading}</h2>
          <p className="faq-subheading">{t.faq.subheading}</p>
        </div>

        <div className="faq-accordion-list" role="region" aria-label="Accordion Questions">
          {t.faq.items.map((item, index) => {
            const isOpen = openIdx === index;
            const itemId = `faq-item-${index}`;
            const headerId = `faq-header-${index}`;

            return (
              <div 
                key={item.q} 
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  type="button"
                  id={headerId}
                  className="faq-question-btn"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={itemId}
                >
                  <span className="faq-q-number">0{index + 1}</span>
                  <span className="faq-question-text">{item.q}</span>
                  <ChevronDown size={20} className={`faq-chevron ${isOpen ? 'rotate' : ''}`} />
                </button>

                <div
                  id={itemId}
                  className={`faq-answer-collapse ${isOpen ? 'open' : ''}`}
                  role="region"
                  aria-labelledby={headerId}
                >
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Note */}
        <div className="faq-assistance-box">
          <HelpCircle size={20} className="help-icon" />
          <p>
            Have additional questions regarding Purandar Highlands agricultural plots? Call Mr. Saurabh Pawar at <strong>+91-9028986499</strong> (10 AM to 5 PM).
          </p>
        </div>

      </div>
    </section>
  );
};

export default Faq;
