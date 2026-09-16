import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SiteCharacteristics.css';

gsap.registerPlugin(ScrollTrigger);

const SiteCharacteristics = () => {
  const charRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        const items = gsap.utils.toArray(itemsRef.current.children);
        
        gsap.fromTo(items,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: charRef.current,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1, // Smooth scrub
            }
          }
        );
      }
    }, charRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="characteristics" className="char-section" ref={charRef}>
      <div className="char-container">
        <h2 className="char-title">THE SITE</h2>
        
        <div className="char-grid" ref={itemsRef}>
          <div className="char-item">
            <h3 className="char-value">[AREA SQ.FT]</h3>
            <p className="char-label">PLOT AREA</p>
          </div>
          
          <div className="char-item">
            <h3 className="char-value">[DIRECTION]</h3>
            <p className="char-label">ORIENTATION</p>
          </div>
          
          <div className="char-item">
            <h3 className="char-value">PRIME</h3>
            <p className="char-label">ACCESS</p>
          </div>
          
          <div className="char-item">
            <h3 className="char-value">[STATUS]</h3>
            <p className="char-label">APPROVALS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteCharacteristics;
