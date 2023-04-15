// router for featured

const express = require('express');
const { getFeatured } = require('../controllers/featured.js');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('Request received in /featured route');
    getFeatured(req, res);
});

module.exports = router;
