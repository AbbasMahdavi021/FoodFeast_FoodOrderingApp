const db = require('../db');
const moment = require('moment');

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

const getOrderItemsByOrderId = async (req, res) => {
  const { orderId } = req.params;

  try {
    const q = 'SELECT * FROM order_items WHERE order_id = ?';
    db.query(q, [orderId], (error, results) => {
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

module.exports = (io) => {
  const getOrdersByRestaurantId = async (req, res) => {
    const { restaurantId } = req.params;

    console.log('restaurantId', restaurantId)

    try {
      const q = 'SELECT * FROM food_orders WHERE restaurant_id = ?';
      db.query(q, [restaurantId], (error, results) => {
        if (error) {
          console.error("Error fetching orders:", error);
          res.status(500).json({ message: "Error fetching orders" });
        } else {
          res.status(200).json(results);
        }
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      res.status(500).json({ message: "Error fetching orders" });
    }
  };

  const createOrder = async (req, res) => {
    const {
      customerId,
      restaurantId,
      orderDate,
      orderStatus,
      orderTotal,
      deliveryAddress,
      paymentMethod,
      specialInstructions,
    } = req.body;

    const formattedOrderDate = moment(orderDate).format('YYYY-MM-DD HH:mm:ss');

    try {
      const q = `
        INSERT INTO food_orders
        (customer_id, restaurant_id, order_date, order_status, order_total, delivery_address, payment_method, special_instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        q,
        [
          customerId,
          restaurantId,
          formattedOrderDate,
          orderStatus,
          orderTotal,
          deliveryAddress,
          paymentMethod,
          specialInstructions,
        ],
        (error, result) => {
          if (error) {
            console.error("Error creating order:", error);
            res.status(500).json({ message: "Error creating order" });
          } else {
            const newOrder = {
              ...req.body,
              order_id: result.insertId,
              order_date: formattedOrderDate,
            };
            res.status(201).json(newOrder);

            io.to(restaurantId).emit("newOrder", newOrder);
          }
        }
      );
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: "Error creating order" });
    }
  };

  return { getOrdersByUserId, getOrdersByRestaurantId, createOrder, getOrderItemsByOrderId };
};
