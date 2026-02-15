import React from 'react';

import { Hero } from '../components/home/Hero';
import Products from '../components/home/Products';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
    

     
      <Hero/>
      <Products/>
    </div>
  );
};

export default Home;
