/**
 * Project Title: FoodFeast - Full Stack Web Application
 *
 * Filename: Cart.jsx
 * Created on: 04/23
 * Author(s): Abbas M., Jed G.
 * Contact: amahdavi2@sfsu.edu, jgraves4@mail.sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 *
 * Description: Child component that takes itemName, Price, Quantity, etc,
 *      and render a cart item in for the parent component, Cart.
 *      Two buttons for updating item Quantity, that's a function in Cart.js Class.
 */

import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import '../styles/Cart.css'
import UserContext from '../context'

import CartCheckout from '../components/Cart/CartCheckout'


const CartItem = (props) => {

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <img src={props.itemImage} alt="itemImage" />
      </div>
      <div className="cart-item-detail">
        <div className="cart-item-name"> Item Name{props.itemName} </div>
        <div className="cart-item-quantity">
          <button
            className="item-quantity-button"
            onClick={() => props.updateQuantity(-1, props.itemId)}
          >
            {' '}
            -{' '}
          </button>
          <div> {props.itemQuantity} </div>
          <button
            className="item-quantity-button"
            onClick={() => props.updateQuantity(1, props.itemId)}
          >
            {' '}
            +{' '}
          </button>
        </div>

        <div className="cart-item-price">${(props.itemPrice * props.itemQuantity).toFixed(2)} </div>
      </div>
    </div>
  );
};



/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: RegisterForm.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This is a component that manages a shopping cart. It keeps track of the items in the cart, 
their quantity and price, and allows the user to checkout.

When the component renderes, it loads the cart items from the server and updates the cartItems state.

The component renders the list of cart items, along with their image, name, price, 
and quantity, using the child component above. It also shows the subtotal, tax, and total cost of the cart.

If there are no items in the cart, the component displays a image telling the user to shop. 
If there are items, it shows a "Place Order" button that calls the handleCheckout function.

handleCheckout sends the cart data to the server and navigates to the home page.

**/


export const Cart = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [toggle, setToggle] = useState(false);

  const [checkout, setCheckout] = useState(0);
  const [popUp, setPopUp] = useState(false);

  const [socket, setSocket] = useState(null);

  //Change restaurandId to get fetched from getCart, rather than local storage,

  const [restaurantId, setRestaurantId] = useState();

  const { user } = useContext(UserContext);

  const [formData, setFormData] = useState({
    building: "",
    room: "",
    paymentMethod: "",
    specialInstructions: "",
    checkbox: false,
  });

  const handleChange = (e) => {
    let obj = {
      ...formData
    }

    obj[e.target.name] = e.target.value;
    setFormData(obj);

    setErr(null);
  };

  const deliveryAddress = "SFSU Campus: " + formData.building + " " + formData.room;

  const [err, setErr] = useState(null);


  const togglePopup = () => {
    setPopUp(!popUp);
  };

  const navigateToHome = () => {
    togglePopup();
    navigate('/');
  };

  const updateQuantity = async (addend, id) => {
    const res = await axios.post(
      'cart/updateQuantity',
      { addend: addend, itemId: id },
      { withCredentials: true },
    );
    setToggle(!toggle);
  };

  useEffect(() => {
    const loadCart = async () => {
      const res = await axios.post('cart/getCart', { withCredentials: true });

      let resData = [];

      if (res.data.itemList && typeof res.data.itemList[Symbol.iterator] === 'function') {
        resData = [...res.data.itemList];
      } else {
        // Handle the case where res.data.itemList is not iterable
        console.error('res.data.itemList is not iterable');
      }

      setCartItems(resData);
      setRestaurantId(res.data.restaurantId);
      setTotalQuantity(res.data.totalQuantity);
      setTotalCost(res.data.totalCost);
    };
    loadCart();
  }, [toggle]);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleCheckout = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour12: false
      }).replace(/:\d{2}$/, '');

      console.log(formattedDate);

      const response = await axios.post('http://localhost:8080/orders', {
        withCredentials: true,
        cartItems,
        customerId: user.id,
        restaurantId: restaurantId,
        orderDate: formattedDate,
        orderStatus: 'Pending',
        orderTotal: total,
        deliveryAddress: deliveryAddress,
        paymentMethod: formData.paymentMethod,
        specialInstructions: formData.specialInstructions,
      });

      const orderId = response.data.orderId;

      if (socket) {
        socket.emit('send-order', response.data, `restaurant-${restaurantId}`);
      }

      //empty cart after order placed
      await axios.post("cart/emptyCart", { withCredentials: true })

      togglePopup();

    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };


  const handleNextClick = async (e) => {

    e.preventDefault()

    if (checkout === 1) {
      if (!formData.building || !formData.room || !formData.paymentMethod) {
        setErr('Please fill in the required fields!');
      } else {
        setErr(null);
        setCheckout(checkout + 1);
      }
    } else {
      setCheckout(checkout + 1);
    }
  };

  const handleBackClick = () => {
    setCheckout(checkout + -1);
  };

  const subTotal = parseFloat(totalCost).toFixed(2);
  const tax = (parseFloat(totalCost) * 0.1).toFixed(2);
  const deliveryFee = 3.99;
  const total = (parseFloat(subTotal) + parseFloat(tax) + deliveryFee).toFixed(2);

  if (!user) {
    return navigate('/login');
  }

  return (

    <div className="cart-container">

      {cartItems.length === 0 ? (
        <>

          <h1>{user ? user.username : 'User'}, Your Cart is currently empty.  </h1>
          <h3>Keep exploring and add delicious items to continue your food journey! </h3>
          <div className="empty-cart">
            <img
              src={process.env.PUBLIC_URL + '/images/brand/empty-cart.png'}
              alt="Your cart is empty"
            />
            <div className="shop-button">
              <button onClick={() => navigate('/browse')}>Shop Now</button>
            </div>
          </div>
        </>
      ) : (
        <>

          {checkout === 1 && (

            <div className='cart-checkout'>

              {checkout &&
                <CartCheckout
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  handleNextClick={handleNextClick}
                  err={err}
                  title="Sign Up"
                />}

            </div>

          )}

          <h1>Welcome to Your Cart, {user ? user.username : 'User'}</h1>

          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem
                itemId={item.id}
                itemImage={item.image}
                itemName={item.name}
                itemPrice={item.price}
                itemQuantity={item.itemQuantity}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          <div className="cart-balance">
            <h2>Sub-Total: ${subTotal}</h2>
            <h2>Tax: ${tax}</h2>
            <h2>Delivery Fee: ${deliveryFee}</h2>
            <h2>
              Total: ${total}
            </h2>
          </div>

          <div className="checkout-button">
            {checkout === 0 && (
              <>
                <button onClick={() => navigate('/browse')}>Add more items</button>
                <button onClick={handleNextClick}>Checkout</button>
              </>
            )}
            {checkout === 2 && (
              <>
                <button onClick={handleBackClick}>Modify Checkout</button>
                <button onClick={() => {
                  handleCheckout();
                  togglePopup();
                }}>Place Order</button>

              </>
            )}
          </div>

          {popUp && (
            <div className='popUp'>
              <div className="popUpDiv">
                <h3>Dear {user.username}, Your order with:<br /><br /></h3>
                <h3>{totalQuantity} items, for ${total} ({formData.paymentMethod}),<br /><br /></h3>
                <h3>has been placed, and will be delivered to <br /><br />{deliveryAddress}<br /><br /></h3>
                <h3>Please check your email for the order receipt and status!<br /><br /></h3>
                <h3>Thank you for choosing FoodFeast<br /><br /></h3>
                <div className="checkout-button">
                  <button onClick={navigateToHome}>Close</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>


  )
}
