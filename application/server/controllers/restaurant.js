/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: restaurant.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module provides endpoints to get restaurant information, 
 *    including retrieving all restaurants, a restaurant by ID, restaurants by 
 *    cuisine, menu items for a restaurant, featured restaurants, and restaurants 
 *    by owner ID.
 * 
 */

const db = require("../db.js");

const getRestaurants = async (req, res) => {
  try {
    const rows = [];
    const q = `
    SELECT r.*, c.cuisine_name
    FROM restaurants r
    JOIN cuisines c ON r.cuisine = c.id
  `;
    db.query(q, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send(results);
      }
    });

  } catch (err) {
    console.error(err);
    res.send([]);
  }
};


const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const q = 'SELECT * FROM restaurants WHERE id = ?';

    db.query(q, [id], (error, results) => {
      if (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
      } else if (results.length) {
        res.status(200).send(results[0]);
      } else {
        res.status(404).json({ message: 'Restaurant not found' });
      }
    });

  } catch (err) {
    console.error('Error in getRestaurantById:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getRestaurantsByCuisine = async (req, res) => {
  try {
    const { category } = req.params;
    const rows = [];
    const q = 'SELECT * FROM restaurants WHERE category = ?';

    db.query(q, [category], (error, results) => {
      results.forEach(row => rows.push(row));
      res.send(rows);
    });

  } catch (err) {
    console.error(err);
    res.send([]);
  }
};


const getAllCuisines = async (req, res) => {
  try {
    const id = req.params.id;
    const rows = [];
    const q = 'SELECT * FROM cuisines';

    db.query(q, [id], (error, results) => {
      results.forEach(row => rows.push(row));
      res.send(rows);
    });
  } catch (err) {
    console.error(err);
    res.send([]);
  }
};


const getRestaurantByOwner = async (req, res) => {
  try {
    const { owner_id } = req.params;
    const rows = [];
    const q = 'SELECT * FROM restaurants WHERE owner_id = ?';


    db.query(q, [owner_id], (error, results) => {
      if (error) {
        console.error("Query error:", error);
        return res.status(500).json({ error: "Error executing query" });
      }

      results.forEach(row => rows.push(row));
      res.send({ restaurants: rows });

    });

  } catch (err) {
    console.error(err);
    res.send([]);
  }
};


const getFeatured = async (req, res) => {
  try {
    const rows = [];
    const q = `
          SELECT * 
          FROM restaurants 
          WHERE is_featured = 1
      `;

    db.query(q, (error, results) => {
      if (error) {
        console.error('Error in getFeatured query:', error);
        res.status(500).json({ message: 'An error occurred while fetching featured restaurants.' });
        return;
      }

      results.forEach(row => rows.push(row));
      res.send(rows);
    });

  } catch (err) {
    console.error(err);
    res.send([]);
  }
}


const getMenu = async (req, res) => {

  try {
    const id = req.params.id;
    const rows = [];
    const q = 'SELECT * FROM menu_items WHERE restaurant_id = ?';

    db.query(q, [id], (error, results) => {
      results.forEach(row => rows.push(row));
      res.send(rows);
    });

  } catch (err) {
    console.error(err);
    res.send([]);
  }
}



module.exports = { getRestaurants, getRestaurantById, getAllCuisines, getRestaurantsByCuisine, getMenu, getFeatured, getRestaurantByOwner };