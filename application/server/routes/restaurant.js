const express = require("express");
const { getRestaurants, getRestaurantById , getRestaurantsByCuisine } = require("../controllers/restaurant.js");
const router = express.Router();

router.get("/getAllRestaurants", getRestaurants);

router.get("/:id", getRestaurantById);

router.get("cuisine", getRestaurantsByCuisine);


module.exports = router;