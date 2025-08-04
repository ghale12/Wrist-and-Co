const express = require('express');
const router = express.Router();
const { register, login, getUsers, getUserOrders, getAllOrders } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// @route   GET api/users
// @desc    Get all users
// @access  Admin
router.get('/users', getUsers);

// @route   GET api/users/:id/orders
// @desc    Get all orders for a user
// @access  Admin
router.get('/users/:id/orders', getUserOrders);

// @route   GET api/orders
// @desc    Get all orders
// @access  Admin
router.get('/orders', getAllOrders);

module.exports = router; 