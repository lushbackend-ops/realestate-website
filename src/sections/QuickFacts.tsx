import React from 'react';
import { Clock, Mountain, Layers, Navigation, Plane, Car } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './QuickFacts.css';

const QuickFacts: React.FC = () => {
  const { t } = useLanguage();

  const facts = [
    {
      id: 1,
      icon: <Clock size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact1,
      sub: t.quickFacts.fact1Sub,
    },
    {
      id: 2,
      icon: <Mountain size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact2,
      sub: t.quickFacts.fact2Sub,
    },
    {
      id: 3,
      icon: <Layers size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact3,
      sub: t.quickFacts.fact3Sub,
    },
    {
      id: 4,
      icon: <Navigation size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact4,
      sub: t.quickFacts.fact4Sub,
    },
    {
      id: 5,
      icon: <Plane size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact5,
      sub: t.quickFacts.fact5Sub,
    },
    {
      id: 6,
      icon: <Car size={24} strokeWidth={1.5} />,
      title: t.quickFacts.fact6,
      sub: t.quickFacts.fact6Sub,
    },
  ];

  return (
    <section className="quick-facts-strip" aria-label="Project Quick Facts">
      <div className="section-container">
        <div className="facts-grid">
          {facts.map((item) => (
            <div key={item.id} className="fact-card">
              <div className="fact-icon-wrapper" aria-hidden="true">
                {item.icon}
              </div>
              <div className="fact-content">
                <h3 className="fact-title">{item.title}</h3>
                <p className="fact-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickFacts;
