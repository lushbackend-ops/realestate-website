import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../assets';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!trackRef.current || !sectionRef.current) return;

      const panels = gsap.utils.toArray<HTMLElement>('.gallery-panel');
      const images = gsap.utils.toArray<HTMLImageElement>('.gallery-img');
      const getScrollAmount = () => {
        if (!trackRef.current) return 0;
        return trackRef.current.scrollWidth - window.innerWidth;
      };

      // Main horizontal scroll
      gsap.to(trackRef.current, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: 'power1.inOut'
          },
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true
        }
      });

      // Parallax for inner images
      images.forEach((img) => {
        gsap.fromTo(img, 
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              scrub: true
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="gallery-horizontal-track" ref={trackRef}>

        {/* Panel 1: Intro */}
        <div className="gallery-panel intro-panel">
          <div className="gallery-intro-content">
            <p className="section-label">THE GALLERY</p>
            <h2>A closer look.</h2>
            <p className="intro-text">Keep scrolling to explore the site.</p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="gallery-panel image-panel">
          <div className="gallery-img-wrapper">
            <img src={ASSETS.images.plot2} alt="Property detail" className="gallery-img" />
          </div>
        </div>

        {/* Panel 3 */}
        <div className="gallery-panel image-panel">
          <div className="gallery-img-wrapper">
            <img src={ASSETS.images.landscape} alt="Wide landscape" className="gallery-img" />
          </div>
        </div>

        {/* Panel 4 */}
        <div className="gallery-panel text-panel">
          <h3 className="gallery-quote">"Nature and design in perfect harmony."</h3>
        </div>

        {/* Panel 5 */}
        <div className="gallery-panel image-panel">
          <div className="gallery-img-wrapper">
            <img src={ASSETS.images.road} alt="Access road" className="gallery-img" />
          </div>
        </div>

        {/* Panel 6 */}
        <div className="gallery-panel image-panel">
          <div className="gallery-img-wrapper">
            <img src={ASSETS.images.site} alt="Site perspective" className="gallery-img" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
