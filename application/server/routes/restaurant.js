const express = require("express");
const { getRestaurants , getRestaurantsByCuisine, getFeatured, getMenu } = require("../controllers/restaurant.js");

const router = express.Router();

router.get("/getAllRestaurants", getRestaurants);

router.get("/getFeatured", getFeatured);

router.get("/cuisine", getRestaurantsByCuisine);

router.get("/getMenu/:id", getMenu);


module.exports = router;