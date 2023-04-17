// route for adding an item to the menu

const express = require('express');
const router = express.Router();
const { addMenuItem } = require('../controllers/addMenuItem');

router.post('/', (req, res, next) => {
    console.log('Request reached the router');
    next();
}, addMenuItem);

module.exports = router;
