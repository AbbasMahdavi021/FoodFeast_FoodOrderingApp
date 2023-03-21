const db = require("../db.js");

const getRestaurants = async (req, res) => {
  try {
    const rows = [];

    const q = 'SELECT * FROM restaurants';

    db.query(q, (error, results, fields) => {
      results.forEach(row => rows.push(row));
      console.log(rows);
      res.send(rows);
    });
  } catch (err) {
    console.error(err);
    res.send([]);
  }
};

const getRestaurantById = async (id) => {
  try {
    const [rows] = await db.execute('SELECT * FROM restaurants WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = { getRestaurants, getRestaurantById };