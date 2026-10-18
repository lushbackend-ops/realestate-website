import React, { useState } from 'react';
import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import QuickFacts from '../sections/QuickFacts';
import About from '../sections/About';
import Heritage from '../sections/Heritage';
import PlotSizes from '../sections/PlotSizes';
import Connectivity from '../sections/Connectivity';
import WhyPurandar from '../sections/WhyPurandar';
import Gallery from '../sections/Gallery';
import BrochureBanner from '../sections/BrochureBanner';
import Faq from '../sections/Faq';
import Enquiry from '../sections/Enquiry';
import Chatbot from '../components/Chatbot';
import PrivacyModal from '../components/PrivacyModal';

const Home: React.FC = () => {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <Layout 
      onOpenPrivacy={() => setPrivacyModalOpen(true)}
    >
      {/* 4A. Hero */}
      <Hero />

      {/* 4B. Quick Facts Strip */}
      <QuickFacts />

      {/* 4C. About Project */}
      <About />

      {/* 4D. Purandar Fort & Heritage */}
      <Heritage />

      {/* 4E. Plot Sizes & Roads */}
      <PlotSizes />

      {/* 4F. Connectivity & Map */}
      <Connectivity />

      {/* 4G. Why Purandar Highlands */}
      <WhyPurandar />

      {/* 4H. Gallery */}
      <Gallery />

      {/* 5C. Brochure Download Banner (Direct Download) */}
      <BrochureBanner />

      {/* Part 7. FAQ */}
      <Faq />

      {/* 4I. Enquiry Form */}
      <Enquiry />

      {/* Event-Based Virtual Concierge Chatbot */}
      <Chatbot />

      {/* Privacy Policy Modal */}
      <PrivacyModal 
        isOpen={privacyModalOpen} 
        onClose={() => setPrivacyModalOpen(false)} 
      />
    </Layout>
  );
};

export default Home;
