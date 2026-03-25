const express = require('express');
const router = express.Router();

// Import routes
const inventoryRoutes = require('./inventory');
const productRoutes = require('./products');
const authRoutes = require('./auth');

// Use routes
router.use('/inventory', inventoryRoutes);
router.use('/products', productRoutes);
router.use('/auth', authRoutes);

module.exports = router;