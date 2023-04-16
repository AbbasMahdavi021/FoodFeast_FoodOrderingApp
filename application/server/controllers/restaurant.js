const db = require("../db.js");

const getRestaurants = async (req, res) => {
  try {
    const rows = [];
    const q = 'SELECT * FROM restaurants';

    db.query(q, (error, results) => {
      results.forEach(row => rows.push(row));
      res.send(rows);
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
      if (results.length) {
        res.send(results[0]);
      } else {
        res.status(404).json({ message: 'Restaurant not found!!!' });
      }
    });

  } catch (err) {
    console.error(err);
    res.send([]);
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

module.exports = { getRestaurants, getRestaurantById, getRestaurantsByCuisine, getMenu, getFeatured };