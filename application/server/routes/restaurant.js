const express = require("express");
const { getRestaurants, getRestaurantById } = require("../controllers/restaurant.js");

const router = express.Router();

router.get("/getAllRestaurants", getRestaurants);
  //const restaurants = await getRestaurants();
  //res.json(restaurants);


router.get("/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const restaurantInfo = await getRestaurantById(restaurantId);
  if (restaurantInfo) {
    res.json(restaurantInfo);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

module.exports = router;