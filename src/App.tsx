import { ReactLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider } from './context/LanguageContext';
import { PlotSelectionProvider } from './context/PlotSelectionContext';
import Home from './pages/Home';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <LanguageProvider>
      <PlotSelectionProvider>
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
          <Home />
        </ReactLenis>
      </PlotSelectionProvider>
    </LanguageProvider>
  );
}

export default App;
