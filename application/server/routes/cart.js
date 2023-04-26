const express = require("express");

const {addToCart, getCart, updateQuantity, storeCart} = require('../controllers/cart');

const router = express.Router();

router.post("/addToCart", addToCart);
router.post("/storeCart", storeCart);
router.post("/getCart", getCart);
router.post("/updateQuantity", updateQuantity);

module.exports = router;

