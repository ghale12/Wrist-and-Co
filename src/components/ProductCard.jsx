import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card-link">
      <div className="product-card">
        <img src={product.imageUrl} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.brand}</p>
        <p>${product.price.toLocaleString()}</p>
        <span className="view-details-btn">View Details</span>
      </div>
    </Link>
  );
};

export default ProductCard; 