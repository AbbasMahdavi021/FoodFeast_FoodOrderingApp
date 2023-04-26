// controller for adding restaurants to the database

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
