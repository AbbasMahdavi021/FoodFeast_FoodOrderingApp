/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: sendEmail.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for email
 * 
 */

const express = require("express");
const {password} = require("../controllers/sendEmail.js");

const router = express.Router();

router.post("/password", password);

module.exports = router;