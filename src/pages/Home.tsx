import Layout from '../components/Layout';
import Hero from '../sections/Hero';
import Land from '../sections/Land';
import SiteCharacteristics from '../sections/SiteCharacteristics';
import Location from '../sections/Location';
import Gallery from '../sections/Gallery';
import Pricing from '../sections/Pricing';
import Enquiry from '../sections/Enquiry';

const Home = () => {
  return (
    <Layout>
      <Hero />
      <Land />
      <SiteCharacteristics />
      <Location />
      <Gallery />
      <Pricing />
      <Enquiry />
    </Layout>
  );
};

export default Home;
