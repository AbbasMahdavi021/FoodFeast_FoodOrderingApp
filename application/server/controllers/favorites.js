const db = require('../db');

const saveFavorite = async (req, res) => {
    try {
        const { user_id, restaurant_id } = req.body;
        const q = 'INSERT INTO user_favorites (user_id, restaurant_id) VALUES (?, ?)';
        db.query(q, [user_id, restaurant_id], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Favorite not saved!' });
            } else {
                res.status(201).json({ message: 'Favorite saved!' });
            }
        });
    } catch (err) {
        console.error(err);
        res.send([]);
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { user_id, restaurant_id } = req.body;
        const q = 'DELETE FROM user_favorites WHERE user_id = ? AND restaurant_id = ?';
        db.query(q, [user_id, restaurant_id], (error, results) => {
            if (error) {
                res.status(400).json({ message: 'Favorite not deleted!' });
            } else {
                res.status(201).json({ message: 'Favorite deleted!' });
            }
        });
    } catch (err) {
        console.error(err);
        res.send([]);
    }
};

const getFavorites = async (req, res) => {
    try {
        console.log("getting user favorites")
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

