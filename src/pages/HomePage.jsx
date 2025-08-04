import React from 'react';
import FeaturedWatches from '../components/FeaturedWatches';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Timeless Luxury, Delivered</h1>
          <p className="hero-tagline">Discover the world’s finest watches, curated for you by Wrist & Co.</p>
          <a href="/shop" className="hero-cta">Shop Now</a>
        </div>
      </section>
      <FeaturedWatches />
    </div>
  );
};

export default HomePage; 