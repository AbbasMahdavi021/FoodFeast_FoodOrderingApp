/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: driver.js
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for drivers
 * 
 */

const express = require("express");
const { register, becomeDriver} = require("../controllers/driver.js");

const router = express.Router();

router.post("/register", register);
router.post("/becomeDriver", becomeDriver);

module.exports = router;