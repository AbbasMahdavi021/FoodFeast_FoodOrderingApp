/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: enrollRestaurant.js
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for enrolling a restaurant
 * 
 */

const {enrollRestaurant} = require('../controllers/enrollRestaurant');
const express = require('express');
const router = express.Router();

router.post('/', enrollRestaurant);

module.exports = router;