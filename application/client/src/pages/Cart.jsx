import axios from 'axios';
import { useState, useEffect } from 'react';
import '../styles/Cart.css';


const CartItem = (props) => {

    return (

        <div className='cart-item'>
            <div className='cart-item-img'>
                <img src={props.itemImage} alt='itemImage' />
            </div>
            <div className='cart-item-info'>
                <div className='cart-item-detail'>
                    <div className='cart-item-name'>{props.itemName} </div>
                    <div className='cart-item-price'>{props.itemPrice} </div>
                </div>
                <button onClick={() => props.updateQuantity(1, props.itemId)}> + </button>
                <div> {props.itemQuantity} </div>
                <button onClick={() => props.updateQuantity(-1, props.itemId)}> - </button>
            </div>
        </div>
    )

}


export const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const [toggle, setToggle] = useState(false);

    const updateQuantity = async (addend, id) => {

        const res = await axios.post('cart/updateQuantity', {addend: addend, itemId: id}, {withCredentials: true});
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

    const handleCheckout = async() =>{
     const res = await axios.post('cart/storeCart',{withCredentials: true}); 
     console.log(JSON.stringify(res));  
    };


    return (

        <div className='cart-container'>
            <h1> Cart </h1>


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
            <button className='checkout-button' onClick={handleCheckout}>Place Order</button>
            <p id='cart-balance'> ${parseFloat(totalCost).toFixed(2)} </p>
        </div>
    )
}