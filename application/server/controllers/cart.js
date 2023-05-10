/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: cart.js
 * Created on: 03/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module manages a shopping cart by adding, retrieving, and updating items, 
 *              as well as storing the cart's contents in the database.
 * 
 */

const Cart = require('../config/cart.js');
const db = require('../db.js');

const addToCart = async (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {
        itemList: [],
        totalQuantity: 0,
        totalCost: 0,
        restaurantId: -1,
    });

    cart.addItem(req.body);

    req.session.cart = cart;

    res.json(req.session.cart);
}

const getCart = async (req, res) => {
    res.send(req.session.cart);
}

const updateQuantity = async (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {
        itemList: [],
        totalQuantity: 0,
        totalCost: 0,
        restaurantId: -1,
    });

    cart.updateItem(req.body.itemId, req.body.addend);
    req.session.cart = cart;

    res.send(true);
}

const createOrder = async (orderData) => {
    return new Promise((resolve, reject) => {
        const q = 'INSERT INTO food_orders (customer_id, restaurant_id, order_date, order_status, order_total, delivery_address, payment_method, special_instructions) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const data = [orderData.customerId, orderData.restaurantId, orderData.orderDate, orderData.orderStatus, orderData.orderTotal, orderData.deliveryAddress, orderData.paymentMethod, orderData.specialInstructions];

        db.query(q, data, (error, results) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });
    });
};

const createOrderEndpoint = async (req, res) => {
    try {
        const orderId = await createOrder(req.body);
        res.json({ insertId: orderId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while creating the order.' });
    }
};

const storeCart = async (req, res) => {
    let cart = new Cart(req.session.cart ? req.session.cart : {
        itemList: [],
        totalQuantity: 0,
        totalCost: 0,
        restaurantId: -1,
    });

    if (cart.itemList.length < 1) {
        res.send({ message: "cart is empty" });
    }

    const cartItems = req.body.cartItems;

    const orderData = {
        customerId: req.body.customerId,
        restaurantId: req.body.restaurantId,
        orderDate: req.body.orderDate,
        orderStatus: req.body.orderStatus,
        orderTotal: req.body.orderTotal,
        deliveryAddress: req.body.deliveryAddress,
        paymentMethod: req.body.paymentMethod,
        specialInstructions: req.body.specialInstructions
    };

    try {
        const orderResults = await createOrder(orderData);
        const orderId = await createOrder(orderData);

        let q = "INSERT INTO order_items (order_id, menu_item_id, quantity, price, item_total, special_requests) VALUES (?, ?, ?, ?, ?, ?)";
        for (let i = 0; i < cartItems.length; i++) {
            db.query(q, [orderId, cartItems[i].itemId, cartItems[i].itemQuantity, cartItems[i].price, cartItems[i].itemQuantity * cartItems[i].price, cartItems[i].specialRequests || " "],
                (error, results) => {
                    if (error) {
                        console.log(error.message);
                        res.send({ message: "could not insert order items" });
                    }
                });
        }

        res.send({ message: "Success", orderId: orderId });
    } catch (error) {
        console.error("Error creating order:", error);
        res.send({ message: "Error creating order" });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    storeCart,
    createOrderEndpoint
};