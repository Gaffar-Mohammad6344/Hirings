// src/pages/Home.jsx
import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import Work from '../components/Work';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Work/>
      <Services />
      <Pricing />
      <Testimonials />
      <Footer />
  
      {/* Any other sections specific to the landing page */}
    </div>
  );
};

export default Home;