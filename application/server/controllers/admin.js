const db = require("../db.js");


const getUserList = async (req, res) => {

    try {
        const rows = [];
        const q = 'SELECT * FROM users WHERE isAdmin = 0 AND isDriver = 0 AND isRestaurantOwner = 0';
    
        db.query(q, (error, results) => {
          results.forEach(row => rows.push(row));
          res.send(rows);
        });
    
      } catch (err) {
        console.error(err);
        res.send([]);
      }
};


module.exports = { getUserList };