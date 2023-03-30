import React from 'react';

const MenuItem = (props) => {

    return (
        <div className='menu_item'>
            <h2>
                {props.itemName}
            </h2>
            <img src={props.image} alt={props.itemName} />
            <p>
                $ {props.price}
            </p>
        </div>
    );
};

export default MenuItem;