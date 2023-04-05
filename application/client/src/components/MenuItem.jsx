import React from 'react';

const MenuItem = (props) => {

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

            </div>

        </div>
    );
};

export default MenuItem;