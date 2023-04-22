const express = require("express");

const {addToCart} = require('../controllers/cart');

const router = express.Router();

router.post("/addToCart", addToCart);


module.exports = router;

