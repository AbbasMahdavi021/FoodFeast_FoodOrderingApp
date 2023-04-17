const {enrollRestaurant} = require('../controllers/enrollRestaurant');
const express = require('express');
const router = express.Router();

router.post('/', enrollRestaurant);

module.exports = router;