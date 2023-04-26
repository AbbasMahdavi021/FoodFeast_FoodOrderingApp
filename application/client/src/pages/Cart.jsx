/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Cart.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Child component that takes itemName, Price, Quantity, etc, 
 *      and render a cart item in for the parent component, Cart.
 *      Two buttons for updating item Quantity, that's a function in Cart.js Class.
 */

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';


const CartItem = (props) => {

    return (

        <div className='cart-item'>
            <div className='cart-item-img'>
                <img src={props.itemImage} alt='itemImage' />
            </div>
            <div className='cart-item-detail'>
                <div className='cart-item-name'> Item Name{props.itemName} </div>
                <div className='cart-item-quantity'>
                    <button className='item-quantity-button' onClick={() => props.updateQuantity(-1, props.itemId)}> - </button>
                    <div> {props.itemQuantity} </div>
                    <button className='item-quantity-button' onClick={() => props.updateQuantity(1, props.itemId)}> + </button>
                </div>

                <div className='cart-item-price'>${props.itemPrice} </div>
            </div>
        </div>
    )
}


/*

This is a component that manages a shopping cart. It keeps track of the items in the cart, 
their quantity and price, and allows the user to checkout.

When the component renderes, it loads the cart items from the server and updates the cartItems state.

The component renders the list of cart items, along with their image, name, price, 
and quantity, using the child component above. It also shows the subtotal, tax, and total cost of the cart.

If there are no items in the cart, the component displays a image telling the user to shop. 
If there are items, it shows a "Place Order" button that calls the handleCheckout function.

handleCheckout sends the cart data to the server and navigates to the home page.

By; Abbas M.

*/

export const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [toggle, setToggle] = useState(false);

    const updateQuantity = async (addend, id) => {

        const res = await axios.post('cart/updateQuantity', { addend: addend, itemId: id }, { withCredentials: true });
        setToggle(!toggle);

    }

    useEffect(() => {

        const loadCart = async () => {


            const res = await axios.post('cart/getCart', { withCredentials: true });

            const resData = [...res.data.itemList];

            console.log(JSON.stringify(res));
            setCartItems(resData);
            setTotalQuantity(res.data.totalQuantity);
            setTotalCost(res.data.totalCost);
        };
        loadCart();
    }, [toggle]);

    const handleCheckout = async () => {
        const res = await axios.post('cart/storeCart', { withCredentials: true });
        console.log(JSON.stringify(res));
        navigate('/');
    };

    const subTotal = parseFloat(totalCost).toFixed(2);
    const tax = (parseFloat(totalCost) * 0.1).toFixed(2);
    const navigate = useNavigate();

    return (

        <div className='cart-container'>
            <h1> Cart </h1>

            {cartItems.length === 0 ? (
                <>
                    <div className='empty-cart'>
                        <img src={process.env.PUBLIC_URL + '/images/brand/empty-cart.png'} alt='Your cart is empty' />
                        <div className='shop-button'>
                            <button onClick={() => navigate('/')}>Shop Now</button>
                        </div>
                    </ div>


                </>


            ) : (
                <>
                    <div className='cart-items'>

                        {cartItems.map((item) => (

                            <CartItem
                                itemId={item.id}
                                itemImage={item.image}
                                itemName={item.name}
                                itemPrice={item.price}
                                itemQuantity={item.itemQuantity}
                                updateQuantity={updateQuantity} />

                        ))}
                    </div>

                    <div className='cart-balance'>
                        <h2 >Sub-Total: ${subTotal}</h2>
                        <h2 >Tax: ${tax}</h2>
                        <h2 >Total: ${(parseFloat(subTotal) + parseFloat(tax)).toFixed(2)}</h2>
                    </div>

                    <div className='checkout-button'>
                        <button onClick={handleCheckout}>Place Order</button>
                    </div>
                </>
            )
            }
        </div>
    )
}