const express = require('express');
const router = express.Router();
const { getProducts, deleteProduct, createProduct, updateProduct } = require('../controllers/productController');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   POST api/products
// @desc    Create a new product
// @access  Admin
router.post('/', createProduct);

// @route   PUT api/products/:id
// @desc    Update a product by ID
// @access  Admin
router.put('/:id', updateProduct);

// @route   DELETE api/products/:id
// @desc    Delete a product by ID
// @access  Admin
router.delete('/:id', deleteProduct);

module.exports = router; 