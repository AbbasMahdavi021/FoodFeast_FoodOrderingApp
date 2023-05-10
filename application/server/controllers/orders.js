/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: orders.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module handles order-related operations, including fetching and creating orders, 
 *    and getting order items.
 * 
 */
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
  const changeOrderStatus = async (req, res) => {
    const { orderId, orderStatus } = req.body;

    try {
      const q = 'UPDATE food_orders SET order_status = ? WHERE order_id = ?';
      db.query(q, [orderStatus, orderId], (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json(results);

          const orderDetailsQuery = `
            SELECT fo.order_id, fo.order_date, fo.order_total, fo.delivery_address, fo.special_instructions, r.name, r.est_delivery_time
            FROM food_orders fo
            JOIN restaurants r ON fo.restaurant_id = r.id
            WHERE fo.order_id = ?
          `;

          db.query(orderDetailsQuery, [orderId], (error, orderDetailsResults) => {
            if (error) {
              console.error('Error fetching order details:', error);
            } else {
              const orderDetails = orderDetailsResults[0];
              if (orderStatus === 'In Progress') {
                io.to('drivers').emit('orderInProgress', orderDetails);
              }
            }
          });
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

  const addOrderItem = async (orderId, cartItems) => {
    try {
      const q = "INSERT INTO order_items (order_id, menu_item_id, quantity, price, item_total, special_requests) VALUES (?, ?, ?, ?, ?, ?)";
      for (let i = 0; i < cartItems.length; i++) {
        db.query(q, [orderId, cartItems[i].itemId, cartItems[i].itemQuantity, cartItems[i].price, cartItems[i].itemQuantity * cartItems[i].price, cartItems[i].specialRequests || " "],
          (error, results) => {
            if (error) {
              console.log(error.message);
              res.send({ message: "could not insert order items" });
            }
          });
      }
    } catch (error) {
      console.log("Error adding order item: ", error);
      throw error;
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
      cartItems
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
            addOrderItem(result.insertId, cartItems); 
          }
        }
      );
    } catch (err) {
      console.error("Error creating order:", err);
      res.status(500).json({ message: "Error creating order" });
    }
  };

  return { getOrdersByUserId, getOrdersByRestaurantId, createOrder, getOrderItemsByOrderId, changeOrderStatus };
};