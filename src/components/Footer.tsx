import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: '-30%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true
          }
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-content-wrapper" ref={contentRef}>
        <div className="footer-content">
          <div className="footer-brand">
            <h2>THE LAND</h2>
            <p>A place with possibility.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Contact</h3>
              <p>1-800-PROPERTY</p>
              <p>info@theland.com</p>
            </div>
            <div className="footer-column">
              <h3>Location</h3>
              <p>Prime Plot Area</p>
              <p>Verified Location</p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Land. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
