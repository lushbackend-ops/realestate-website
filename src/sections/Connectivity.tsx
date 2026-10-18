import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Clock, Plane, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './Connectivity.css';

const Connectivity: React.FC = () => {
  const { t } = useLanguage();
  const [loadInteractiveMap, setLoadInteractiveMap] = useState(false);

  const handleDirectionsClick = () => {
    trackEvent('get_directions_click', { destination: 'Purandar_Highlands' });
  };

  return (
    <section id="connectivity" className="connectivity-section section-padding" aria-label="Connectivity and Strategic Location">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="connectivity-header">
          <span className="eyebrow">{t.connectivity.label}</span>
          <h2 className="connectivity-heading">{t.connectivity.heading}</h2>
          <p className="connectivity-body-copy">{t.connectivity.body}</p>
        </div>

        {/* 4 Location Distance Hubs */}
        <div className="connectivity-hubs-grid">
          
          <div className="hub-card">
            <div className="hub-icon-box">
              <Clock size={24} />
            </div>
            <div className="hub-details">
              <span className="hub-tag">PUNE CITY</span>
              <h3 className="hub-title">{t.connectivity.hubs.swargate.title}</h3>
              <div className="hub-metric">{t.connectivity.hubs.swargate.distance}</div>
              <p className="hub-note">{t.connectivity.hubs.swargate.note}</p>
            </div>
          </div>

          <div className="hub-card">
            <div className="hub-icon-box">
              <Navigation size={24} />
            </div>
            <div className="hub-details">
              <span className="hub-tag">CORRIDOR ACCESS</span>
              <h3 className="hub-title">{t.connectivity.hubs.highway.title}</h3>
              <div className="hub-metric">{t.connectivity.hubs.highway.distance}</div>
              <p className="hub-note">{t.connectivity.hubs.highway.note}</p>
            </div>
          </div>

          <div className="hub-card highlight-card">
            <div className="hub-icon-box gold">
              <Plane size={24} />
            </div>
            <div className="hub-details">
              <span className="hub-tag gold">FUTURE HUB</span>
              <h3 className="hub-title">{t.connectivity.hubs.airport.title}</h3>
              <div className="hub-metric">{t.connectivity.hubs.airport.distance}</div>
              <p className="hub-note">{t.connectivity.hubs.airport.note}</p>
            </div>
          </div>

          <div className="hub-card">
            <div className="hub-icon-box">
              <Compass size={24} />
            </div>
            <div className="hub-details">
              <span className="hub-tag">HISTORIC LANDMARK</span>
              <h3 className="hub-title">{t.connectivity.hubs.fort.title}</h3>
              <div className="hub-metric">{t.connectivity.hubs.fort.distance}</div>
              <p className="hub-note">{t.connectivity.hubs.fort.note}</p>
            </div>
          </div>

        </div>

        {/* Action Button: Get Directions */}
        <div className="connectivity-actions-row">
          <a
            href={ASSETS.links.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-get-directions"
            onClick={handleDirectionsClick}
            aria-label="Get Directions to Purandar Highlands on Google Maps"
          >
            <MapPin size={18} />
            <span>{t.connectivity.getDirections}</span>
            <ExternalLink size={15} />
          </a>
        </div>

        {/* Lightweight Click-To-Load Google Maps Embed */}
        <div className="map-embed-wrapper">
          {!loadInteractiveMap ? (
            <div className="map-placeholder-card">
              <div className="map-placeholder-content">
                <MapPin size={36} className="map-pin-pulse" />
                <h4>Ghera Purandar, Purandar, Pune</h4>
                <p>Click below to preview live satellite orientation and driving navigation.</p>
                <button
                  type="button"
                  className="btn btn-outline btn-load-map"
                  onClick={() => setLoadInteractiveMap(true)}
                >
                  <Navigation size={16} />
                  <span>{t.connectivity.loadMap}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="map-iframe-container">
              <iframe
                title="Purandar Highlands Project Location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3789.288599427027!2d74.0049444!3d18.2413889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDE0JzI5LjAiTiA3NMKwMDAnMTcuOCJF!5e0!3m2!1sen!2sin!4v1714000000000!5m2!1sen!2sin"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Connectivity;
