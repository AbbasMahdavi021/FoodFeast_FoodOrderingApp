// controllers for featured restaurants
const db = require('../db.js');

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


module.exports = {getFeatured};