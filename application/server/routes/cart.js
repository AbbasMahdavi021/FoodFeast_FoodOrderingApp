/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: cart.js
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for the cart
 * 
 */

const express = require("express");

const { addToCart, getCart, updateQuantity, storeCart, createOrderEndpoint } = require('../controllers/cart');

const router = express.Router();

router.post("/addToCart", addToCart);
router.post("/storeCart", storeCart);
router.post("/getCart", getCart);
router.post("/updateQuantity", updateQuantity);
router.post("/createOrder", createOrderEndpoint);

module.exports = router;


