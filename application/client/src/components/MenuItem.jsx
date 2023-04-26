/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: MenuItem.jsx
 * Created on: 04/23
 * Author(s): Abbas M., Nathan R.
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This is a child component that, renders a single menu item.
 *      It has an image, name, price, and an "add to cart" button. When the button is clicked, 
 *      the component sends a POST request to the server to add the item to the cart. 
 *      Component get called per menu item, in parent component 
 */


import React from 'react';
import axios from 'axios';

const MenuItem = (props) => {

    const handleAddItemToCart = async () => {

        const res = await axios.post("/cart/addToCart", {
            restaurantId: props.restaurantId,
            id: props.id,
            price: props.price,
            image: props.image,
            itemQuantity: 1, 
        });

    }

    return (
        <div className='menu-item-box'>
            <img src={props.image} alt={props.itemName} />
            <button className="add-to-cart-button" onClick={handleAddItemToCart}>
            +
            </button>
            <div className='menu-item-details '>
                <h2>
                    {props.itemName}
                </h2>
                <p>
                    $ {props.price}
                </p>

            </div>

        </div>
    );
};

export default MenuItem;