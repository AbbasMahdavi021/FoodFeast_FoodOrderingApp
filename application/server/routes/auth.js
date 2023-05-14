/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: auth.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for authentication
 * 
 */

const express = require("express");
const { register, login, logout, getStatus, adminlogin, restaurantOwnerRegister} = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/restaurantOwnerRegister", restaurantOwnerRegister);
router.post("/login", login);
router.post("/logout", logout);
router.post("/adminlogin", adminlogin);
router.get("/getStatus", getStatus);

module.exports = router;
