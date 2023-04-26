const express = require('express');
const router = express.Router();

module.exports = (io) => {
  const { getOrdersByUserId, getOrdersByRestaurantId, createOrder, getOrderItemsByOrderId } = require('../controllers/orders')(io);

  router.get('/user/:id', getOrdersByUserId);

  router.get('/restaurant/:restaurantId', getOrdersByRestaurantId);

  router.post('/', (req, res) => createOrder(req, res, io));

  router.get('/items/:orderId', getOrderItemsByOrderId);

  return router;
};
