/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: driver.js
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for drivers
 * 
 */

const express = require("express");
const { register} = require("../controllers/driver.js");

const router = express.Router();

router.post("/register", register);


module.exports = router;