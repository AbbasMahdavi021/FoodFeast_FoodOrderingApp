import React from 'react';
import axios from 'axios';

const MenuItem = (props) => {


    const handleClick = async () => {

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

            <div className='menu-item-details '>
                <h2>
                    {props.itemName}
                </h2>
                <p>
                    $ {props.price}
                </p>

                <button className='add-to-cart-btn' onClick={handleClick}>
                    Add To Card
                </button>

            </div>

        </div>
    );
};

export default MenuItem;