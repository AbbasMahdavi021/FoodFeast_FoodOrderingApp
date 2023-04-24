// controller for adding restaurants to the database

const db = require('../db');

const enrollRestaurant = async (req, res) => {
    try {
        const { name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating, } = req.body;

        const q = 'INSERT INTO restaurants (name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(q, [name, cuisine, description, est_delivery_time, address, picture, phone, hours, price, rating], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Restaurant not saved!' });
            } else {
                const restaurant_id = results.insertId;
                res.status(201).json({ message: 'Restaurant Enrolled: ', restaurant_id });
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
