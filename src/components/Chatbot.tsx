import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Download, Calendar, ExternalLink, Sparkles, CheckCircle2, User, Phone, Check, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePlotSelection, PLOT_OPTIONS } from '../context/PlotSelectionContext';
import { ASSETS } from '../assets';
import { submitLead } from '../utils/leadService';
import { trackEvent } from '../utils/analytics';
import './Chatbot.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  action?: 'enquiry_form' | 'brochure' | 'whatsapp' | 'options';
  showMenuButton?: boolean;
}

const Chatbot: React.FC = () => {
  const { lang } = useLanguage();
  const { selectedPlot, setSelectedPlot } = usePlotSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [showInlineBooking, setShowInlineBooking] = useState(false);
  
  // Inline Form State inside chatbot
  const [bookName, setBookName] = useState('');
  const [bookPhone, setBookPhone] = useState('');
  const [bookPlot, setBookPlot] = useState(selectedPlot || PLOT_OPTIONS[0]);
  const [bookDate, setBookDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(1);
  const nextMsgId = () => (++msgIdCounter.current).toString();
  const isMarathi = lang === 'mr';

  const defaultGreeting = isMarathi
    ? 'नमस्कार! मी पुरंदर हायलँड्स व्हर्च्युअल असिस्टंट आहे. खालीलपैकी कोणताही पर्याय निवडा किंवा थेट प्रश्न विचारा:'
    : 'Hello! Welcome to Purandar Highlands. Choose an option below or type your question:';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: defaultGreeting,
      action: 'options',
    },
  ]);

  useEffect(() => {
    if (selectedPlot) {
      setBookPlot(selectedPlot);
    }
  }, [selectedPlot]);

  // Event trigger: Show friendly greeting pill after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, showInlineBooking, bookingSuccess]);

  // Preset Option Questions (Rendered below each other inside chat)
  const presetOptions = isMarathi
    ? [
        { label: '📐 उपलब्ध प्लॉटचे आकार व माहिती', query: 'प्लॉटचे आकार' },
        { label: '🚗 स्वारगेट व विमानतळापासून अंतर', query: 'पुण्यापासून अंतर' },
        { label: '🏰 पुरंदर किल्ला दृश्य व वारसा', query: 'पुरंदर किल्ला' },
        { label: '🗓️ साइट व्हिजिट बुक करा', query: 'साइट व्हिजिट बुक करा' },
        { label: '📄 अधिकृत माहितीपत्रक (PDF)', query: 'माहितीपत्रक' },
      ]
    : [
        { label: '📐 Available Plot Sizes & Details', query: 'What plot sizes are available?' },
        { label: '🚗 Distance from Pune & Airport', query: 'How far is it from Pune & Airport?' },
        { label: '🏰 Purandar Fort View & Heritage', query: 'Tell me about the Fort view and heritage' },
        { label: '🗓️ Book a Free Site Visit', query: 'I want to book a site visit' },
        { label: '📄 Download Official Brochure (PDF)', query: 'Download the official brochure' },
      ];

  const getBotResponse = (query: string): { text: string; action?: 'enquiry_form' | 'brochure' | 'whatsapp' } => {
    const q = query.toLowerCase();

    // Booking a site visit
    if (q.includes('book') || q.includes('visit') || q.includes('appointment') || q.includes('भेट') || q.includes('बुक')) {
      setShowInlineBooking(true);
      return {
        text: isMarathi
          ? 'नक्कीच! तुम्ही खालील फॉर्ममध्ये थेट साइट व्हिजिट निश्चित करू शकता. आमची टीम तुमच्या प्रवासाचे मार्केटयार्ड, पुणे कार्यालयातून मोफत नियोजन करेल.'
          : 'Certainly! You can book your complimentary site visit directly in the form below. We will coordinate your visit from our Pune Marketyard office.',
        action: 'enquiry_form',
      };
    }

    // Plot sizes
    if (q.includes('plot') || q.includes('size') || q.includes('guntha') || q.includes('acre') || q.includes('आकार') || q.includes('प्लॉट')) {
      return {
        text: isMarathi
          ? 'पुरंदर हायलँड्समध्ये ११ गुंठे (११,९७९ चौ.फूट), २० गुंठे (२१,७८० चौ.फूट), १ एकर, २ एकर, ३ एकर, ४ एकर आणि ५ एकर अशा ७ प्रकारच्या शेतजमीन प्लॉट्सचे पर्याय उपलब्ध आहेत. सर्व प्लॉट्ससाठी अंतर्गत ३० फूट रुंद प्रशस्त रस्ते आहेत.'
          : 'Purandar Highlands offers 7 agricultural plot sizes: 11 Guntha (approx 11,979 sq.ft), 20 Guntha (approx 21,780 sq.ft), 1 Acre, 2 Acre, 3 Acre, 4 Acre, and 5 Acre. All plots feature 30-foot wide internal arterial roads.',
        action: 'enquiry_form',
      };
    }

    // Distance, location, airport, highway
    if (q.includes('distance') || q.includes('location') || q.includes('airport') || q.includes('swargate') || q.includes('pune') || q.includes('road') || q.includes('अंतर') || q.includes('विमानतळ') || q.includes('रस्ता')) {
      return {
        text: isMarathi
          ? 'प्रकल्प स्वारगेट (पुणे) पासून फक्त ४५ मिनिटांवर आहे. पुणे-बंगळुरू महामार्ग (NH-48) अवघ्या ७ मिनिटांवर असून प्रस्तावित छत्रपती संभाजी राजे आंतरराष्ट्रीय विमानतळाच्या अगदी जवळ आहे.'
          : 'Purandar Highlands is just 45 minutes from Swargate, Pune. It is 7 minutes from the Pune-Bengaluru NH-48 Highway and adjacent to the upcoming Chhatrapati Sambhaji Raje International Airport.',
      };
    }

    // Fort & Heritage
    if (q.includes('fort') || q.includes('heritage') || q.includes('sambhaji') || q.includes('view') || q.includes('किल्ला') || q.includes('वारसा')) {
      return {
        text: isMarathi
          ? 'सर्व प्लॉट्सवरून ऐतिहासिक पुरंदर किल्ल्याचे भव्य विहंगम दृश्य दिसते. हा छत्रपती संभाजी महाराजांचे पावन जन्मस्थान असलेला सह्याद्रीचा परिसर आहे.'
          : 'Every plot offers a direct panoramic horizon view of historic Purandar Fort, the revered birthplace of Chhatrapati Sambhaji Maharaj, nestled in the Sahyadri mountains.',
      };
    }

    // Brochure
    if (q.includes('brochure') || q.includes('pdf') || q.includes('download') || q.includes('माहिती') || q.includes('पत्रक')) {
      return {
        text: isMarathi
          ? 'तुम्ही अधिकृत ४-पानांचे माहितीपत्रक (PDF) थेट डाउनलोड करू शकता. कोणतीही नोंदणी किंवा फॉर्म भरण्याची गरज नाही.'
          : 'You can directly download the official 4-page documentation PDF right now. Zero registration required.',
        action: 'brochure',
      };
    }

    // Contact
    if (q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('phone') || q.includes('नंबर') || q.includes('फोन')) {
      return {
        text: isMarathi
          ? 'तुम्ही आमच्या मुख्य कार्यालयाशी +91-9028986499 वर थेट संपर्क साधू शकता किंवा WhatsApp वर त्वरित चॅट करू शकता.'
          : 'You can reach our principal office directly at +91-9028986499 or chat with our property advisor instantly on WhatsApp.',
        action: 'whatsapp',
      };
    }

    // Default Fallback
    return {
      text: isMarathi
        ? 'मी पुरंदर हायलँड्स (१२५ एकर शेतजमीन प्लॉट्स, ४५ मिनिटे स्वारगेट) बद्दल माहिती देऊ शकतो. खालील पर्यायांमधून निवडा किंवा साइट व्हिजिट बुक करा:'
        : 'I can assist you with details on Purandar Highlands (125 acres of countryside plots, 45 mins from Swargate). You can pick an option below or book a site visit right here:',
      action: 'enquiry_form',
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: nextMsgId(),
      sender: 'user',
      text: query,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    trackEvent('chatbot_query', { query });

    setTimeout(() => {
      const response = getBotResponse(query);
      const botMsg: Message = {
        id: nextMsgId(),
        sender: 'bot',
        text: response.text,
        action: response.action,
        showMenuButton: true,
      };
      setMessages(prev => [...prev, botMsg]);
    }, 320);
  };

  // Back to Main Menu - Posts the menu inside chat with vertical question list
  const handleBackToMenu = () => {
    setShowInlineBooking(false);
    setBookingSuccess(false);
    setBookingError(null);
    const menuMsg: Message = {
      id: nextMsgId(),
      sender: 'bot',
      text: isMarathi 
        ? 'मुख्य मेनू: कृपया खालीलपैकी एक पर्याय निवडा:' 
        : 'Main Menu: Please choose an option below:',
      action: 'options',
    };
    setMessages(prev => [...prev, menuMsg]);
    trackEvent('chatbot_query', { action: 'back_to_menu' });
  };

  // Submit inline booking form inside chatbot & link to main page form
  const handleInlineBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    const cleanName = bookName.trim();
    if (cleanName.length < 2) {
      setBookingError(isMarathi ? 'कृपया तुमचे नाव प्रविष्ट करा.' : 'Please enter your full name.');
      return;
    }

    const cleanPhone = bookPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setBookingError(isMarathi ? 'कृपया वैध १०-अंकी मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setBookingLoading(true);

    try {
      const result = await submitLead({
        type: 'site_visit',
        name: cleanName,
        phone: cleanPhone,
        plot: bookPlot,
        date: bookDate || undefined,
        lang,
      });

      if (result.success) {
        trackEvent('form_submit', { source: 'chatbot_inline', plot: bookPlot });

        // Link directly to main form on page
        setSelectedPlot(bookPlot);
        
        const mainNameInput = document.getElementById('enquiry-fullname') as HTMLInputElement | null;
        const mainPhoneInput = document.getElementById('enquiry-phone') as HTMLInputElement | null;
        if (mainNameInput) mainNameInput.value = cleanName;
        if (mainPhoneInput) mainPhoneInput.value = cleanPhone;

        setBookingLoading(false);
        setBookingSuccess(true);
        setShowInlineBooking(false);

        const confirmationMsg: Message = {
          id: nextMsgId(),
          sender: 'bot',
          text: isMarathi
            ? `धन्यवाद ${cleanName}! तुमची साइट व्हिजिट विनंती (${bookPlot}) नोंदवली गेली आहे. आमची टीम लवकरच +91-${cleanPhone} वर संपर्क साधेल.`
            : `Thank you, ${cleanName}! Your site visit request for ${bookPlot} has been confirmed. Our team will contact you shortly at +91-${cleanPhone}.`,
          showMenuButton: true,
        };
        setMessages(prev => [...prev, confirmationMsg]);
      } else {
        throw new Error(result.message);
      }
    } catch {
      setBookingLoading(false);
      setBookingError(isMarathi ? 'नोंदणी पूर्ण होऊ शकली नाही. कृपया पुन्हा प्रयत्न करा.' : 'Submission error. Please call +91-9028986499 directly.');
    }
  };

  return (
    <div className="event-chatbot-root">
      {/* Floating Greeting Pill */}
      {!isOpen && showPrompt && (
        <div className="chatbot-nudge" onClick={() => setIsOpen(true)}>
          <Sparkles size={14} className="nudge-icon" />
          <span>{isMarathi ? 'प्लॉट्सबद्दल माहिती हवी आहे का?' : 'Questions about plot sizes or visit?'}</span>
          <button 
            type="button" 
            className="nudge-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowPrompt(false);
            }}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      {/* Floating Gradient Launcher */}
      <button
        type="button"
        className={`chatbot-launcher ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPrompt(false);
        }}
        aria-label={isOpen ? 'Close Concierge Chat' : 'Open Purandar Concierge'}
        title="Purandar Concierge"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Purandar Highlands Virtual Concierge">
          {/* Vibrant Gradient Header */}
          <div className="chatbot-header">
            <div className="header-info">
              <div className="bot-avatar">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="bot-title">Purandar Concierge</h3>
                <span className="bot-status">
                  <span className="status-dot" />
                  {isMarathi ? 'सक्रिय सहाय्यक' : 'Online · Verified Property Guide'}
                </span>
              </div>
            </div>
            
            <div className="header-actions-group">
              <button
                type="button"
                className="chatbot-btn-menu-header"
                onClick={handleBackToMenu}
                title={isMarathi ? 'मुख्य मेनू' : 'Back to Menu'}
              >
                <RotateCcw size={13} />
                <span>{isMarathi ? 'मेनू' : 'Menu'}</span>
              </button>
              <button
                type="button"
                className="chatbot-header-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Message Stream */}
          <div className="chatbot-messages">
            {messages.map((m) => (
              <div key={m.id} className={`message-bubble ${m.sender} ${m.action === 'options' ? 'has-options' : ''}`}>
                <p className="bubble-text">{m.text}</p>

                {/* Suggested Questions in chat itself - Stacked Below Each Other */}
                {m.action === 'options' && (
                  <div className="chat-options-vertical-list">
                    {presetOptions.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="option-vertical-btn"
                        onClick={() => handleSend(chip.query)}
                      >
                        <span className="option-btn-label">{chip.label}</span>
                        <span className="option-btn-arrow">→</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Contextual Actions */}
                {m.action && m.action !== 'options' && (
                  <div className="bubble-action-row">
                    {m.action === 'enquiry_form' && !showInlineBooking && !bookingSuccess && (
                      <button
                        type="button"
                        className="btn-chat-action gradient"
                        onClick={() => setShowInlineBooking(true)}
                      >
                        <Calendar size={14} />
                        <span>{isMarathi ? 'येथे साइट व्हिजिट फॉर्म उघडा' : 'Book Site Visit in Chat'}</span>
                      </button>
                    )}
                    {m.action === 'brochure' && (
                      <a
                        href={ASSETS.documents.brochure}
                        download="Purandar-Highlands-Brochure.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-chat-action gradient"
                      >
                        <Download size={14} />
                        <span>{isMarathi ? 'थेट PDF डाउनलोड' : 'Direct PDF Download'}</span>
                      </a>
                    )}
                    {m.action === 'whatsapp' && (
                      <a
                        href={ASSETS.links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-chat-action whatsapp"
                      >
                        <ExternalLink size={14} />
                        <span>{isMarathi ? 'WhatsApp वर बोला' : 'Chat on WhatsApp'}</span>
                      </a>
                    )}
                  </div>
                )}

                {/* "Back to Menu" option button inside the message */}
                {m.showMenuButton && (
                  <div className="bubble-menu-row">
                    <button
                      type="button"
                      className="btn-message-menu"
                      onClick={handleBackToMenu}
                    >
                      <RotateCcw size={12} />
                      <span>{isMarathi ? 'मुख्य मेनूवर परत जा' : 'Back to Menu'}</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Inline Booking Form inside Chatbot */}
            {showInlineBooking && (
              <div className="chatbot-inline-form-card">
                <div className="inline-form-header">
                  <Calendar size={16} className="inline-form-icon" />
                  <h4>{isMarathi ? 'साइट व्हिजिट बुक करा' : 'Book a Site Visit'}</h4>
                  <button 
                    type="button" 
                    className="btn-close-inline-form"
                    onClick={() => setShowInlineBooking(false)}
                    aria-label="Cancel form"
                  >
                    ×
                  </button>
                </div>

                {bookingError && <div className="inline-error">{bookingError}</div>}

                <form onSubmit={handleInlineBookingSubmit} className="inline-booking-form">
                  <div className="inline-input-group">
                    <User size={14} className="input-glyph" />
                    <input
                      type="text"
                      placeholder={isMarathi ? 'तुमचे नाव *' : 'Your Full Name *'}
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="inline-input-group">
                    <Phone size={14} className="input-glyph" />
                    <input
                      type="tel"
                      placeholder={isMarathi ? 'मोबाईल नंबर *' : 'Mobile Number (10 digits) *'}
                      value={bookPhone}
                      onChange={(e) => setBookPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="inline-select-group">
                    <label>{isMarathi ? 'प्लॉटचा आकार:' : 'Preferred Plot Size:'}</label>
                    <select
                      value={bookPlot}
                      onChange={(e) => setBookPlot(e.target.value)}
                    >
                      {PLOT_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="inline-input-group">
                    <input
                      type="date"
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-inline-submit gradient"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? (
                      <span>{isMarathi ? 'नोंदणी करत आहे...' : 'Confirming...'}</span>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>{isMarathi ? 'व्हिजिट निश्चित करा' : 'Confirm Site Visit'}</span>
                      </>
                    )}
                  </button>
                  
                  <div className="inline-form-footer-actions">
                    <span className="inline-sync-note">
                      {isMarathi ? '✓ मुख्य फॉर्मसोबत जोडलेले आहे' : '✓ Linked directly with main form'}
                    </span>
                    <button
                      type="button"
                      className="btn-cancel-to-menu"
                      onClick={handleBackToMenu}
                    >
                      ↩ {isMarathi ? 'मुख्य मेनू' : 'Back to Menu'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {bookingSuccess && (
              <div className="chatbot-success-badge">
                <CheckCircle2 size={16} />
                <span>{isMarathi ? 'साइट व्हिजिट यशस्वीरीत्या बुक झाली!' : 'Site visit successfully scheduled!'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Clean Input Bar at Bottom */}
          <form
            className="chatbot-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isMarathi ? 'काहीही विचारा...' : 'Ask about sizes, distance, price...'}
              className="chat-text-input"
            />
            <button
              type="submit"
              className="chat-send-btn gradient"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
