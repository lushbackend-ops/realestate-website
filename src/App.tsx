import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <Home />
    </ReactLenis>
  );
}

export default App;
