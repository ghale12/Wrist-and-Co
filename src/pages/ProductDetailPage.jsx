import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext.jsx';
import { CartContext } from '../context/CartContext.jsx';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { products, loading } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
    }
  }, [id, products, loading]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <h2>{product.brand}</h2>
        <p className="price">${product.price.toLocaleString()}</p>
        <div className="details-grid">
          <p><strong>Type:</strong> {product.type}</p>
          <p><strong>Gender:</strong> {product.gender}</p>
          <p><strong>Strap Material:</strong> {product.strapMaterial}</p>
          <p><strong>Dial Color:</strong> {product.dialColor}</p>
          <p><strong>Case Size:</strong> {product.caseSize}</p>
          <p><strong>Water Resistance:</strong> {product.waterResistance}</p>
        </div>
        <h3>Description</h3>
        <p>{product.description}</p>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/checkout')}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 