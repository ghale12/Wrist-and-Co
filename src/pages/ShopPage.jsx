import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../context/ProductContext.jsx';
import ProductCard from '../components/ProductCard';
import './ShopPage.css';

const ShopPage = () => {
  const { products, loading } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState(120000);

  const brands = ['all', ...new Set(products.map(p => p.brand))];
  const types = ['all', ...new Set(products.map(p => p.type))];

  useEffect(() => {
    let tempProducts = [...products];

    // Search filter
    if (searchTerm) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrand !== 'all') {
      tempProducts = tempProducts.filter(p => p.brand === selectedBrand);
    }

    // Type filter
    if (selectedType !== 'all') {
      tempProducts = tempProducts.filter(p => p.type === selectedType);
    }
    
    // Price filter
    tempProducts = tempProducts.filter(p => p.price <= priceRange);


    setFilteredProducts(tempProducts);
  }, [searchTerm, selectedBrand, selectedType, priceRange, products]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBrand('all');
    setSelectedType('all');
    setPriceRange(120000);
  };

  return (
    <div className="shop-page-container">
      <aside className="filters-sidebar">
        <h2>Filters</h2>
        <input
          type="text"
          placeholder="Search watches..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />

        <div className="filter-group">
          <label>Brand</label>
          <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <select value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Price: Up to ${priceRange.toLocaleString()}</label>
          <input
            type="range"
            min="0"
            max="120000"
            step="100"
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
          />
        </div>
        
        <button onClick={resetFilters} className="btn-reset">Reset Filters</button>

      </aside>
      <main className="product-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products match your criteria.</p>
        )}
      </main>
    </div>
  );
};

export default ShopPage; 