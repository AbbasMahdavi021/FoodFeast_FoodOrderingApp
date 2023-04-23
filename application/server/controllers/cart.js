const Cart = require('../config/cart.js');

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

    console.log("Getting Cart ")
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

module.exports =  {addToCart, getCart, updateQuantity}; 