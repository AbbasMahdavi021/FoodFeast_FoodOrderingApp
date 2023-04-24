import React from 'react';

const MenuItem = (props) => {

    const handleAddItemToCart = () => {
        console.log('Add button clicked');
      };

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