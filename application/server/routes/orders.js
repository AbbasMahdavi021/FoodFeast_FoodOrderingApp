/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: orders.js
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for orders
 * 
 */

const express = require('express');
const router = express.Router();

module.exports = (io) => {
  const { getUnacceptedOrders, getOrdersByUserId, getOrdersByRestaurantId, createOrder, getOrderItemsByOrderId, changeOrderStatus, setOrderAcceptedByDriver } = require('../controllers/orders')(io);

  router.get('/user/:id', getOrdersByUserId);

  router.get('/restaurant/:restaurantId', getOrdersByRestaurantId);

  router.post('/', (req, res) => createOrder(req, res, io));

  router.get('/items/:orderId', getOrderItemsByOrderId);

  router.put('/updateStatus', changeOrderStatus);

  router.put('/setOrderAcceptedByDriver', setOrderAcceptedByDriver);

  router.get("/unaccepted", getUnacceptedOrders);

  return router;
};
