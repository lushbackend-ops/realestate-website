import { MapPin, Navigation } from 'lucide-react';
import './Location.css';

const Location = () => {
  return (
    <section id="location" className="location-section">
      <div className="location-container">
        <div className="location-header">
          <p className="section-label">THE LOCATION</p>
          <h2 className="location-heading">Connected to<br />what matters.</h2>
        </div>

        <div className="location-content">
          <div className="location-details">
            <div className="location-item">
              <div className="loc-icon"><MapPin size={24} strokeWidth={1} /></div>
              <div className="loc-text">
                <h3>[VERIFIED LOCATION]</h3>
                <p>Prime connectivity to major hubs</p>
              </div>
            </div>

            <div className="location-distances">
              <div className="distance-row">
                <span className="destination">City Center</span>
                <span className="time">XX MIN</span>
              </div>
              <div className="distance-row">
                <span className="destination">International Airport</span>
                <span className="time">XX MIN</span>
              </div>
              <div className="distance-row">
                <span className="destination">Major Highway</span>
                <span className="time">XX MIN</span>
              </div>
            </div>

            <button className="btn-directions">
              <Navigation size={16} /> Get Directions
            </button>
          </div>

          <div className="location-map-visual">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10500.2!2d-118.4117!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1689123456789!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
