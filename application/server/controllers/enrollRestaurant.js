// controller for adding restaurants to the database
/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: enrollRestaurant.js
 * Created on: 03/23
 * Author(s): Jed G. Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module handles enrolling a new restaurant into the system 
 *      by inserting its details into the database. The required details include 
 * 
 *          name, cuisine, description, estimated delivery time, address, picture, 
 *          phone, hours, price, rating, and owner ID.
 * 
 */

const db = require('../db');

const enrollRestaurant = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const { name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating, owner_id} = req.body;

        const q = 'INSERT INTO restaurants (name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(q, [name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating, owner_id], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Restaurant not saved!', restaurant_id: restaurant_id });
            } else {
                const restaurant_id = results.insertId;
                res.status(201).json({ message: 'Restaurant Enrolled: ', restaurant_id: restaurant_id });
            }
        });
    } catch (err) {
        console.error(err);
        res.send([]);
    }
};

module.exports = {
    enrollRestaurant,
};
