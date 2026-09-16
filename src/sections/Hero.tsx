import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../assets';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: "power3.out", delay: 0.5 }
      );

      // Smooth scroll parallax for the video
      gsap.to(parallaxRef.current, {
        y: '25%', // Smoothly shifts down as user scrolls down
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <div className="hero-video-wrapper">
        <div ref={parallaxRef} style={{ width: '100%', height: '100%' }}>
          <video
            ref={videoRef}
            src={ASSETS.video.hero}
            autoPlay
            muted
            loop
            playsInline
            className="hero-video"
            preload="metadata"
            onCanPlay={(e) => {
              e.currentTarget.playbackRate = 2.0;
            }}
          />
        </div>
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-content" ref={textRef}>
        <h1 className="hero-title">A place with room<br />to become something<br />of your own.</h1>
        <p className="hero-subtitle">SCROLL TO DISCOVER</p>
      </div>
    </section>
  );
};

export default Hero;
