import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS } from '../assets';
import './Pricing.css';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%"
          }
        }
      );

      // Image clip-path cinematic reveal
      const imgContainer = sectionRef.current?.querySelector('.pricing-image-container');
      if (imgContainer) {
        gsap.fromTo(
          imgContainer,
          { clipPath: "inset(20% 0% 20% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "center center",
              scrub: 1
            }
          }
        );
      }

      gsap.fromTo(
        tiersRef.current?.children || [],
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          stagger: 0.3, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: tiersRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" className="pricing-section" ref={sectionRef}>
      <div className="pricing-header">
        <p className="section-label" style={{ textAlign: 'center', marginBottom: '1rem' }}>RESIDENCES</p>
        <h2 ref={titleRef}>Pricing &amp; Availability</h2>
        <p className="pricing-subtitle">Curated spaces designed for elevated living.</p>
      </div>

      <div className="pricing-content">
        <div className="pricing-image-container">
           <img src={ASSETS.images.landscape} alt="Luxury Property Overview" className="pricing-hero-img" />
        </div>

        <div className="pricing-tiers" ref={tiersRef}>
          <div className="pricing-tier">
            <h3>XXX</h3>
            <p className="tier-desc">Expansive parcels offering ultimate privacy and endless architectural possibilities.</p>
            <div className="tier-details">
              <div className="detail-item">
                <span>Size</span>
                <span>From XXX</span>
              </div>
              <div className="detail-item">
                <span>Price</span>
                <span>Starting at ₹XXX</span>
              </div>
            </div>
            <button className="btn-tier-enquire">Request Floorplans <span>→</span></button>
          </div>

          <div className="pricing-tier featured">
            <div className="featured-badge">Premium Location</div>
            <h3>XXX</h3>
            <p className="tier-desc">Elevated positions commanding uninterrupted panoramic views of the valley.</p>
            <div className="tier-details">
              <div className="detail-item">
                <span>Size</span>
                <span>From XXX</span>
              </div>
              <div className="detail-item">
                <span>Price</span>
                <span>Starting at ₹XXX</span>
              </div>
            </div>
            <button className="btn-tier-enquire">Request Floorplans <span>→</span></button>
          </div>

          <div className="pricing-tier">
            <h3>XXX</h3>
            <p className="tier-desc">Tranquil settings nestled alongside the natural water features of the property.</p>
            <div className="tier-details">
              <div className="detail-item">
                <span>Size</span>
                <span>From XXX</span>
              </div>
              <div className="detail-item">
                <span>Price</span>
                <span>Starting at ₹XXX</span>
              </div>
            </div>
            <button className="btn-tier-enquire">Request Floorplans <span>→</span></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
