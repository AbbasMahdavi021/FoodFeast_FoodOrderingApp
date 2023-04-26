/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: favorites.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: routes for favorites
 * 
 */

const express = require('express');
const { saveFavorite, deleteFavorite, getFavorites } = require('../controllers/favorites.js');
const router = express.Router();

router.get('/:user_id', (req, res) => {
  getFavorites(req, res);
});

router.post('/save', saveFavorite);
router.post('/delete', deleteFavorite);

module.exports = router;