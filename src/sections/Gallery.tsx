import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import './Gallery.css';

interface GalleryItem {
  id: number;
  src: string;
  captionKey: 'img1' | 'img2' | 'img3' | 'img4' | 'img5';
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: ASSETS.images.landscape, captionKey: 'img1' },
  { id: 2, src: ASSETS.images.plot1, captionKey: 'img2' },
  { id: 3, src: ASSETS.images.road, captionKey: 'img3' },
  { id: 4, src: ASSETS.images.plot2, captionKey: 'img4' },
  { id: 5, src: ASSETS.images.site, captionKey: 'img5' },
];

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev + 1) % GALLERY_ITEMS.length));
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIdx((prev) => (prev === null ? null : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === 'Escape') setActiveIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    },
    [activeIdx, handleNext, handlePrev]
  );

  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIdx, handleKeyDown]);

  return (
    <section id="gallery" className="gallery-section section-padding" aria-label="Purandar Highlands Photo Gallery">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="gallery-header">
          <span className="eyebrow">{t.gallery.label}</span>
          <h2 className="gallery-heading">{t.gallery.heading}</h2>
          <p className="gallery-subheading">{t.gallery.subheading}</p>
        </div>

        {/* Responsive Grid */}
        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, idx) => (
            <figure 
              key={item.id} 
              className="gallery-card"
              onClick={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActiveIdx(idx)}
              aria-label={`View enlarged photo: ${t.gallery.captions[item.captionKey]}`}
            >
              <div className="gallery-image-box">
                <img 
                  src={item.src} 
                  alt={t.gallery.captions[item.captionKey]} 
                  className="gallery-thumbnail"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="450"
                />
                <div className="gallery-hover-overlay">
                  <div className="tap-badge">
                    <Maximize2 size={16} />
                    <span>{t.gallery.tapToEnlarge}</span>
                  </div>
                </div>
              </div>
              <figcaption className="gallery-caption">
                {t.gallery.captions[item.captionKey]}
              </figcaption>
            </figure>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div 
          className="gallery-lightbox-overlay" 
          onClick={() => setActiveIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photo preview"
        >
          <button 
            type="button" 
            className="lightbox-close-btn"
            onClick={() => setActiveIdx(null)}
            aria-label={t.gallery.close}
          >
            <X size={26} />
          </button>

          <button 
            type="button" 
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label={t.gallery.prev}
          >
            <ChevronLeft size={32} />
          </button>

          <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
            <img 
              src={GALLERY_ITEMS[activeIdx].src} 
              alt={t.gallery.captions[GALLERY_ITEMS[activeIdx].captionKey]} 
              className="lightbox-main-img"
            />
            <div className="lightbox-caption-bar">
              <span className="lightbox-counter">
                {activeIdx + 1} / {GALLERY_ITEMS.length}
              </span>
              <p className="lightbox-caption-text">
                {t.gallery.captions[GALLERY_ITEMS[activeIdx].captionKey]}
              </p>
            </div>
          </div>

          <button 
            type="button" 
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={t.gallery.next}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
