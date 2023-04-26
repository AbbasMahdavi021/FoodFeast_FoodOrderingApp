/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: admin.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for admin users
 * 
 */

const express = require("express");
const {getUserList, getUser, deleteUser, deleteRestaurant, processQuery, getRestaurant} = require("../controllers/admin.js");
const { getRestaurants} = require("../controllers/restaurant.js");


const router = express.Router();

router.get("/getUserList", getUserList);

router.post("/getUser", getUser);

router.post("/getRestaurants", getRestaurant);

router.post("/deleteUser", deleteUser);

router.post("/deleteRestaurant", deleteRestaurant);

router.post("/processQuery", processQuery);

router.get("/getAllRestaurants", getRestaurants);


module.exports = router;