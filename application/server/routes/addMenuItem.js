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
const {addMenuItem, deleteMenuItem} = require('../controllers/addMenuItem');

router.post("/addMenuItem", addMenuItem);
router.post("/deleteMenuItem", deleteMenuItem);



module.exports = router;
