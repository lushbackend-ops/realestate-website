import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const scroll1Files = import.meta.glob('/public/assets/scroll/**/*.jpg', { eager: true });
const scroll2Files = import.meta.glob('/public/assets/scroll 2/**/*.jpg', { eager: true });

// Dynamically extract and sort the image paths, stripping '/public' so they resolve correctly in the browser
const scroll1Urls = Object.keys(scroll1Files).map(path => path.replace('/public', '')).sort();
const scroll2Urls = Object.keys(scroll2Files).map(path => path.replace('/public', '')).sort();

const allFrames = [...scroll1Urls, ...scroll2Urls];
export const frameCount = allFrames.length;
export const heroScrollPercentage = Math.round(frameCount * 2.2);
const transitionFrame = scroll1Urls.length; // The exact frame where 'scroll 2' starts

const currentFrame = (index: number) => allFrames[index - 1];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const scrollObj = { frame: 1 };

    const render = () => {
      const frameIndex = Math.max(0, Math.min(frameCount - 1, Math.round(scrollObj.frame) - 1));
      if (!images[frameIndex]) return;
      const img = images[frameIndex];
      if (!img.complete) return;

      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    // Set canvas dimensions to match window
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    // Load first image
    if (frameCount > 0) {
      const firstImg = new Image();
      firstImg.src = currentFrame(1);
      firstImg.onload = () => {
        images[0] = firstImg;
        render();

        // Preload the rest asynchronously
        for (let i = 2; i <= frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
          images[i - 1] = img;
          img.onload = render; // Re-render in case scroll happens before load
        }
      };
    }

    const ctx = gsap.context(() => {
      // Dynamically calculate the scroll length based on frameCount (approx 2.2vh per frame)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: `+=${heroScrollPercentage}%`, 
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
        }
      });

      // Map the timeline progress directly to frame progression
      tl.to(scrollObj, {
        frame: frameCount,
        ease: "none",
        duration: frameCount,
        onUpdate: render,
      }, 0); // Start at absolute time 0

      // Fade in Text Block 1 after a short scroll (frame 15 to 45)
      tl.fromTo(block1Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 30,
        },
        15
      );

      // Fade out Text Block 1 right before entering the house (transition frame)
      tl.to(block1Ref.current, {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        duration: 30,
      }, Math.max(0, transitionFrame - 30));

      // Fade in Text Block 2 precisely as the house sequence begins
      tl.fromTo(block2Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: 30,
        },
        transitionFrame
      );

      // Fade out Text Block 2 before the hero section ends
      tl.to(block2Ref.current, {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        duration: 30,
      }, Math.max(0, frameCount - 50));
    }, hero);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" ref={heroRef}>
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        {/* Block 1 (Initial Sequence) */}
        <div className="hero-text-block" ref={block1Ref}>
          <h1 className="hero-title">FIND YOUR<br/>NEXT ADDRESS</h1>
          <p className="hero-subtitle">Exceptional spaces. Thoughtfully selected.</p>
        </div>

        {/* Block 2 (Second Sequence) */}
        <div className="hero-text-block block-absolute" ref={block2Ref}>
          <h1 className="hero-title">A NEW LEVEL<br/>OF PRESTIGE</h1>
          <p className="hero-subtitle">Architecture that speaks to the landscape.</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
