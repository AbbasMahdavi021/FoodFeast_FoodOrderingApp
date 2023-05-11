/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: db.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: connects to the SQL database requiring a .env for configuration and information
 * 
 */

const mySQL = require("mysql2");
require("dotenv").config();


const db = mySQL.createConnection({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

module.exports = db;