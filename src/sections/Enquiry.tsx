import { ASSETS } from '../assets';
import './Enquiry.css';

const Enquiry = () => {
  return (
    <section id="enquire" className="enquiry-section">
      <div className="enquiry-bg">
        <img src={ASSETS.images.landscape} alt="Possibility" />
        <div className="enquiry-overlay"></div>
      </div>
      
      <div className="enquiry-content">
        <div className="enquiry-header">
          <h2>Come see the land.</h2>
          <p>Experience the site in person.</p>
        </div>
        
        <form className="enquiry-form">
          <div className="form-group">
            <input type="text" placeholder="Name" required />
          </div>
          <div className="form-group">
            <input type="tel" placeholder="Phone" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Preferred Visit Date" />
          </div>
          <button type="submit" className="btn-submit">Schedule a Site Visit</button>
        </form>
      </div>
    </section>
  );
};

export default Enquiry;
