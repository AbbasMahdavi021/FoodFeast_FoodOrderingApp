// routes for orders

const express = require('express');
const router = express.Router();
const { getOrdersByUserId, getOrdersByRestaurantId } = require('../controllers/orders');

router.get('user/:id', getOrdersByUserId);

router.get('/restaurant/:restaurantId', getOrdersByRestaurantId);

module.exports = router;
