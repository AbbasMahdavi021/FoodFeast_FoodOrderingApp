const express = require("express");

const {addToCart, getCart, updateQuantity} = require('../controllers/cart');

const router = express.Router();

router.post("/addToCart", addToCart);
router.post("/getCart", getCart);
router.post("/updateQuantity", updateQuantity);

module.exports = router;

