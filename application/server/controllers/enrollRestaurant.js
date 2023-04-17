// controller for adding restaurants to the database

const db = require('../db');

const enrollRestaurant = async (req, res) => {
    try {
        const { name, cuisine, description, est_delivery_time, address, picture, phone, hours } = req.body;
        const q = 'INSERT INTO restaurants (name, cuisine, description, est_delivery_time, address, picture, phone, hours) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(q, [name, cuisine, description, est_delivery_time, address, picture, phone, hours], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Restaurant not saved!' });
            } else {
                res.status(201).json({ message: 'Restaurant saved!' });
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