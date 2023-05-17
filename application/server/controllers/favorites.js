/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: favorites.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module manages user favorites, including saving, deleting, 
 *      and fetching favorite restaurants for a specific user.
 * 
 */

const db = require('../db');

const saveFavorite = async (req, res) => {

    try {
        const user_id = req.body.user_id;
        const restaurant_id = req.body.restaurant_id;

        console.log("GOT HERE " + user_id)
        const q = 'INSERT INTO user_favorites (user_id, restaurant_id) VALUES (?, ?)';
        db.query(q, [user_id, restaurant_id], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Favorite not saved!' });
            } else {
                res.send({message: "favoriteSaved"})
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteFavorite = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const restaurant_id = req.body.restaurant_id;

        const q = 'DELETE FROM user_favorites WHERE user_id = ? AND restaurant_id = ?';
        db.query(q, [user_id, restaurant_id], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Favorite not removed!' });
            } else {
                res.send({message: "favoriteRemoved"})
            }
        });
    } catch (err) {
        console.error(err);
        res.send([]);
    }
};

const getFavorites = async (req, res) => {
    try {        
        const { user_id } = req.params;
        const rows = [];

        const q = `
            SELECT restaurants.*
            FROM user_favorites
            JOIN restaurants ON user_favorites.restaurant_id = restaurants.id
            WHERE user_favorites.user_id = ?
        `;

        db.query(q, [user_id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error retrieving favorites.' });
            } else {
                results.forEach(row => rows.push(row));
                res.send(rows);
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error retrieving favorites.' });
    }
};


module.exports = {
    saveFavorite,
    deleteFavorite,
    getFavorites,
};