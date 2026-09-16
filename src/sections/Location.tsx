import { MapPin, Navigation } from 'lucide-react';
import './Location.css';

const Location = () => {
  return (
    <section id="location" className="location-section">
      <div className="location-container">
        <div className="location-header">
          <p className="section-label">THE LOCATION</p>
          <h2 className="location-heading">Connected to<br/>what matters.</h2>
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
            <div className="map-placeholder">
              {/* This could later be an actual stylized map integration or a stylized image */}
              <p>Stylized Map Graphic</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
