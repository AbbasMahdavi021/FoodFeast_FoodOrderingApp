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
const storeCart = async(req,res) =>{
    let cart = new Cart(req.session.cart ? req.session.cart : {
        itemList: [],
        totalQuantity: 0,
        totalCost: 0,
        restaurantId: -1,
    });
    if(cart.itemList.length < 1){
        res.send({message:'cart is empty'})
    }

    let q = 'insert into order_items (order_id, menu_item_id , quantity , price , item_total, special_requests) values(?, ?, ?, ?, ?, ?)';
    for(let i =0;i<cart.itemList.length;i++){
        db.query(q,[1,cart.itemList[i].itemId,cart.itemList[i].itemQuantity, cart.itemList[i].price, cart.itemList[i].itemQuantity*cart.itemList[i].price, cart.itemList[i].specialRequests || ' '],
        (error, results)=>{
            if(error){
                console.log(error.message);
                res.send({message:'could not insert order items'})
            }
        })
    }
    res.send({message:"Success"})
}

module.exports =  {addToCart, getCart, updateQuantity, storeCart}; 