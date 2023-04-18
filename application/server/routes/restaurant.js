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