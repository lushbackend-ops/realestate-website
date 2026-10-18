import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { ASSETS } from '../assets';
import { trackEvent } from '../utils/analytics';
import './Hero.css';

interface HeroProps {
  onOpenBrochure?: () => void;
}

const Hero: React.FC<HeroProps> = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance animation for minimal editorial typography
    if (blockRef.current) {
      gsap.fromTo(
        blockRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power2.out', delay: 0.2 }
      );
    }

    // Ensure smooth native hardware video playback
    const vid = videoRef.current;
    if (vid) {
      vid.playbackRate = 1.0;
      vid.play().catch(() => {});
    }
  }, []);

  return (
    <section id="hero" className="hero-section">
      {/* Background Video for Both Laptop/Desktop and Mobile Screens */}
      <video
        ref={videoRef}
        src={ASSETS.video.mobile}
        poster={ASSETS.images.heroPoster}
        className="hero-video"
        playsInline
        muted
        autoPlay
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedMetadata={(e) => {
          // Native framerate with zero dropped frames or judder
          e.currentTarget.playbackRate = 1.0;
        }}
        onEnded={(e) => {
          // Stop on the final frame (no looping)
          e.currentTarget.pause();
        }}
      />

      <div className="hero-overlay" />

      <div className="hero-content">
        {/* Primary Authentic Hero Editorial Typography */}
        <div className="hero-text-block" ref={blockRef}>
          <span className="hero-eyebrow">{t.hero.tagline}</span>
          <h1 className="hero-title">{t.hero.headline}</h1>
          <p className="hero-subtitle">{t.hero.subheadline}</p>
          <p className="hero-supporting">{t.hero.supporting}</p>

          <div className="hero-actions">
            <a
              href="#enquiry"
              className="hero-btn-minimal primary"
              onClick={(e) => {
                e.preventDefault();
                trackEvent('plot_size_select', { source: 'hero_primary' });
                document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{t.hero.btnSiteVisit}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>

            <a
              href={ASSETS.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-btn-minimal secondary"
              onClick={() => trackEvent('whatsapp_click', { source: 'hero_secondary' })}
            >
              <span>{t.hero.btnWhatsApp}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
