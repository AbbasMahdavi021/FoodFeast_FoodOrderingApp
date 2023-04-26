/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: addMenuItem.js
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for adding a menu item
 * 
 */

const express = require('express');
const router = express.Router();
const { addMenuItem } = require('../controllers/addMenuItem');

router.post('/', (req, res, next) => {
    next();
}, addMenuItem);

module.exports = router;
