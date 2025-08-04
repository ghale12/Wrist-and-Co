const express = require('express');
const router = express.Router();
const { userDashboard, adminDashboard } = require('../controllers/dashboardController');
const { auth, admin } = require('../middlewares/auth');

router.get('/user', auth, userDashboard);
router.get('/admin', [auth, admin], adminDashboard);

module.exports = router; 