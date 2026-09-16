import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../assets';
import './Land.css';

gsap.registerPlugin(ScrollTrigger);

const Land = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade and slide up text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          }
        }
      );

      // Subtle image scale on scroll
      gsap.to(imageRef.current, {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="land" className="land-section" ref={sectionRef}>
      <div className="land-container">
        <div className="land-text" ref={textRef}>
          <p className="section-label">THE LAND</p>
          <h2 className="land-heading">More than a plot.<br/>A place with possibility.</h2>
          <p className="land-description">
            Discover a unique canvas where nature and architecture can seamlessly blend. 
            An expansive plot offering unparalleled privacy and breathtaking views.
          </p>
        </div>
        <div className="land-image-wrapper">
          <img 
            ref={imageRef}
            src={ASSETS.images.plot1} 
            alt="The Land Overview" 
            className="land-image" 
          />
        </div>
      </div>
    </section>
  );
};

export default Land;
