import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext.jsx';
import ProductCard from './ProductCard';
import './FeaturedWatches.css';

const FeaturedWatches = () => {
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return <p>Loading featured watches...</p>;
  }
  
  const featuredWatchesData = products.slice(0, 8);

  return (
    <div className="featured-watches">
      <h2>Featured Watches</h2>
      <div className="watches-grid">
        {featuredWatchesData.map(watch => (
          <ProductCard key={watch.id} product={watch} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWatches; 