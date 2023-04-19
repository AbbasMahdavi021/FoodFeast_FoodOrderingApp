const db = require('../db');

const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const q = 'SELECT * FROM food_orders WHERE customer_id = ?';
    db.query(q, [userId], (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json(results);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrdersByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;

    console.log('restaurantId', restaurantId)
  
    try {
      const q = 'SELECT * FROM food_orders WHERE restaurant_id = ?';
      db.query(q, [restaurantId], (error, results) => {
        if (error) {
          console.error("Error:", error);
          res.status(500).json({ message: "Error fetching orders" });
        } else {
            console.log('results', results)
          res.status(200).json(results);
        }
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: "Error fetching orders" });
    }
  };
  

module.exports = {
  getOrdersByUserId,
  getOrdersByRestaurantId
};
