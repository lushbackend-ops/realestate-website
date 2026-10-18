import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './PrivacyModal.css';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="privacy-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="privacy-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="btn-privacy-close" 
          onClick={onClose}
          aria-label={t.privacyModal.close}
        >
          <X size={22} />
        </button>

        <div className="privacy-modal-content">
          <div className="privacy-header-icon">
            <ShieldCheck size={32} />
          </div>

          <h3 id="privacy-modal-title" className="privacy-modal-heading">
            {t.privacyModal.title}
          </h3>

          <div className="privacy-text-body">
            <p>{t.privacyModal.content}</p>
            
            <h4>Lead Information Use</h4>
            <p>
              When you submit a site visit request or download the project brochure, we collect your name and phone number solely to provide property details, schedule tours, and confirm availability.
            </p>

            <h4>Agricultural Plotting Information</h4>
            <p>
              All plots in Purandar Highlands are agricultural plots. Information provided on this website represents verified project parameters without warranty of non-agricultural zoning or speculative appreciation.
            </p>

            <h4>Contact Details</h4>
            <p>
              Developer: New Pune<br />
              Project: Purandar Highlands<br />
              Office: Marketyard, Pune, Maharashtra<br />
              Representative: Mr. Saurabh Pawar, 10 AM to 5 PM<br />
              Email: newpune712@gmail.com | Phone: +91-9028986499
            </p>
          </div>

          <button 
            type="button" 
            className="btn-privacy-dismiss"
            onClick={onClose}
          >
            {t.privacyModal.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
