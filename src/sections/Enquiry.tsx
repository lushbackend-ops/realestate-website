import React, { useState } from 'react';
import { Calendar, Phone, Mail, User, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlotSelection, PLOT_OPTIONS } from '../context/PlotSelectionContext';
import { submitLead } from '../utils/leadService';
import { trackEvent } from '../utils/analytics';
import './Enquiry.css';

const Enquiry: React.FC = () => {
  const { t, lang } = useLanguage();
  const { selectedPlot, setSelectedPlot } = usePlotSelection();

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [customPlot, setCustomPlot] = useState<string | null>(null);
  const plot = customPlot ?? selectedPlot ?? '';
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side Validation
    const cleanName = name.trim();
    if (cleanName.length < 2) {
      setErrorMsg(lang === 'mr' ? 'कृपया पूर्ण नाव प्रविष्ट करा.' : 'Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg(lang === 'mr' ? 'कृपया वैध १० अंकी मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (email && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg(lang === 'mr' ? 'कृपया वैध ई-मेल पत्ता प्रविष्ट करा.' : 'Please enter a valid email address or leave it blank.');
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitLead({
        type: 'site_visit',
        name: cleanName,
        phone: cleanPhone,
        email: email ? email.trim() : undefined,
        plot: plot || undefined,
        date: date || undefined,
        message: message ? message.trim() : undefined,
        lang,
      });

      if (result.success) {
        trackEvent('form_submit', {
          plotSize: plot || 'Not specified',
          preferredDate: date || 'Not specified',
        });

        setSubmitting(false);
        setSubmitted(true);
      } else {
        throw new Error(result.message);
      }
    } catch {
      setSubmitting(false);
      setErrorMsg('Submission could not be completed. Please call us directly at +91-9028986499.');
    }
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setEmail('');
    setCustomPlot(null);
    setSelectedPlot('');
    setDate('');
    setMessage('');
    setSubmitted(false);
    setErrorMsg(null);
  };

  return (
    <section id="enquiry" className="enquiry-section section-padding" aria-label="Book a Site Visit">
      <div className="section-container">
        <div className="enquiry-card-wrapper">
          
          {/* Header */}
          <div className="enquiry-header">
            <span className="eyebrow">{t.enquiry.label}</span>
            <h2 className="enquiry-heading">{t.enquiry.heading}</h2>
            <p className="enquiry-body-copy">{t.enquiry.body}</p>
          </div>

          <div className="enquiry-form-container">
            {submitted ? (
              <div className="enquiry-success-card" role="status">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={54} />
                </div>
                <h3 className="success-title">{t.enquiry.successTitle}</h3>
                <p className="success-description">
                  {t.enquiry.successDesc}
                </p>
                <div className="success-contact-pill">
                  <Clock size={16} />
                  <span>Team hours: 10 AM to 5 PM · Direct: +91-9028986499</span>
                </div>
                <button
                  type="button"
                  className="btn btn-outline btn-submit-another"
                  onClick={handleReset}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
                
                {errorMsg && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={18} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="form-grid-2">
                  {/* Full Name */}
                  <div className="form-input-group">
                    <label htmlFor="enquiry-name">
                      {t.enquiry.fullName} <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <User size={18} className="field-icon" />
                      <input
                        id="enquiry-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.enquiry.fullNamePlaceholder}
                        required
                        disabled={submitting}
                        autoComplete="name"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="form-input-group">
                    <label htmlFor="enquiry-phone">
                      {t.enquiry.phone} <span className="req">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone size={18} className="field-icon" />
                      <input
                        id="enquiry-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        required
                        maxLength={14}
                        disabled={submitting}
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Email */}
                  <div className="form-input-group">
                    <label htmlFor="enquiry-email">
                      {t.enquiry.email} <span className="opt">{t.enquiry.emailOptional}</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input
                        id="enquiry-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rahul@example.com"
                        disabled={submitting}
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Plot size dropdown */}
                  <div className="form-input-group">
                    <label htmlFor="plot-size-select">
                      {t.enquiry.plotSize}
                    </label>
                    <div className="input-with-icon">
                      <select
                        id="plot-size-select"
                        value={plot}
                        onChange={(e) => {
                          setCustomPlot(e.target.value);
                          setSelectedPlot(e.target.value);
                        }}
                        disabled={submitting}
                      >
                        <option value="">{t.enquiry.plotSizeSelect}</option>
                        {PLOT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt} (Agricultural Plot)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-grid-2">
                  {/* Preferred Date */}
                  <div className="form-input-group">
                    <label htmlFor="enquiry-date">
                      {t.enquiry.preferredDate} <span className="opt">{t.enquiry.preferredDateOptional}</span>
                    </label>
                    <div className="input-with-icon">
                      <Calendar size={18} className="field-icon" />
                      <input
                        id="enquiry-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={submitting}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="form-input-group">
                    <label htmlFor="enquiry-msg">
                      {t.enquiry.message} <span className="opt">{t.enquiry.messageOptional}</span>
                    </label>
                    <textarea
                      id="enquiry-msg"
                      rows={2}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.enquiry.messagePlaceholder}
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <div className="form-submit-row">
                  <button
                    type="submit"
                    className="btn btn-primary btn-submit-enquiry"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={18} className="spinner" />
                        <span>{t.enquiry.submitting}</span>
                      </>
                    ) : (
                      <>
                        <Calendar size={18} />
                        <span>{t.enquiry.submit}</span>
                      </>
                    )}
                  </button>
                  <p className="consent-text">{t.enquiry.consent}</p>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Enquiry;
