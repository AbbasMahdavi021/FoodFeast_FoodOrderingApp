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

    console.log(JSON.stringify(req.session.cart))


    res.json(req.session.cart);



}

module.exports =  {addToCart}; 