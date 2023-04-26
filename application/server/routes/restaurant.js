/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: restaurant.js
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for restaurants
 * 
 */

const express = require("express");
const { getRestaurants , getRestaurantsByCuisine, getFeatured, getMenu, getRestaurantByOwner, getRestaurantById } = require("../controllers/restaurant.js");

const router = express.Router();

router.get("/restaurant/:id", getRestaurantById);

router.get("/getAllRestaurants", getRestaurants);

router.get("/getFeatured", getFeatured);

router.get("/cuisine", getRestaurantsByCuisine);

router.get("/owner/:owner_id", getRestaurantByOwner);

router.get("/getMenu/:id", getMenu);


module.exports = router;