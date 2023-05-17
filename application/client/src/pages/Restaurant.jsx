/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Restaurant.jsx
 * Created on: 04/23
 * Author(s): Abbas M., Nathan R.
 * Contact: amahdavi2@sfsu.edu, nrennacker@mail.sfsu.edu.
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This component renders the menu items for a particular restaurant. 
 *      It receives the restaurant ID from the URL parameters using the useParams hook, 
 *      and makes an API call to fetch the menu items for the restaurant. 
 *      The fetched items are rendered using the MenuItem component.
 * 
 */

import axios from 'axios';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import UserContext from '../context';
import '../styles/MenuItem.css';
import AddToFavorite from '../components/AddToFavorite';

const Restaurant = (props) => {

    const { user } = useContext(UserContext);
    const user_id = user ? user.id : null;

    const navigate = useNavigate();

    const { id } = useParams();
    const [restaurant, setRestaurant] = useState([]);
    const [newItem, setNewItem] = useState([]);

    const [favoritedRestaurants, setFavoritedRestaurants] = useState([]);

    const [popUp, setPopUp] = useState("");
    const [addedToFav, setAddedToFav] = useState(false);

    const togglePopup = () => {
        setTimeout(() => {
            setPopUp(false);
        }, 3000);
    };

    const navigateToCart = () => {
        togglePopup();
        navigate('/cart');
    };

    const handleLike = async () => {

        if (!user) {
            navigate('/login');
        } else {
            if (addedToFav === false) {
                console.log("Adding to Fav")
                const res = await axios.post("/favorites/saveFavorite",
                    { user_id: user_id, restaurant_id: id });

                const message = res.data.message;
                setAddedToFav(true);
                setPopUp(message)
                togglePopup();

            }
            if (addedToFav === true) {
                console.log("removing Favorite");
                const res = await axios.post("/favorites/deleteFavorite",
                    { user_id: user_id, restaurant_id: id });

                const message = res.data.message;
                setPopUp(message)
                setAddedToFav(false);
                togglePopup();
            }
        }
    }

    useEffect(() => {

        const getFavorites = async () => {
            try {
                const res = await axios.get(`/favorites/${user_id}`);

                console.log(res.data)

                for (let i=0; i < res.data.length; i ++) {
                    console.log(res.data[i].id)
                    console.log(id)

                    if (res.data[i].id == id){
                        setAddedToFav(true);
                    }
                }

            } catch (err) {
                console.error(err);
            }
        }; getFavorites();

        const getRestaurantById = async () => {

            try {
                const response = await axios.get(`/restaurants/getRestaurantById/${id}`)
                setRestaurant(response.data);
            } catch (err) {
                console.error(err);
            }
        }; getRestaurantById();

        const getMenu = async () => {
            try {
                const response = await axios.get(`/restaurants/getMenu/${id}`);
                let rows = response.data;
                if (rows.length > 0) {
                    setNewItem([...rows]);
                } else {
                    console.log("No Menu Items to Show!");
                }
            } catch (err) {
                console.error(err);
            }
        }; getMenu();

    }, [user_id]);

    return (
        <div className='restaurant-page'>

            <div className='restaurant-header-div'>
                <img className='restaurant-banner' src={restaurant.picture} alt={restaurant.name} />
                <div className="restaurant-menu-details">
                    <h1>{restaurant.name}</h1>
                    <h2>{restaurant.description}</h2>
                </div>

                <div class="love">
                    <input id="switch" type="checkbox" onClick={handleLike} checked={addedToFav} />
                    <label class="love-heart" for="switch">
                        <i class="left"></i>
                        <i class="right"></i>
                        <i class="bottom"></i>
                        <div class="round"></div>
                    </label>
                </div>

            </div>

            <div className='restaurant-menu-div'>
                <h1>Menu</h1>
                <div className='menu_container'>
                    {newItem.map(item => {
                        return (
                            <MenuItem
                                id={item.id}
                                image={item.image}
                                itemName={item.name}
                                price={item.price}
                                restaurantId={id}
                                togglePopup={togglePopup}
                                setPopUp={setPopUp}
                            />
                        )
                    })}
                </div>

                {popUp === "addToCart" && (
                    <div className="menuPopUpDiv">
                        <h3>Item Added to Cart</h3>
                        <div className="checkout-button">
                            <button onClick={navigateToCart}>Go To Checkout?</button>
                        </div>
                    </div>
                )}

                {popUp === "favoriteSaved" && (
                    <div className="menuPopUpDiv">
                        <h3>Restaurant Added To Favorites</h3>
                    </div>
                )}

                {popUp === "favoriteRemoved" && (
                    <div className="menuPopUpDiv">
                        <h3>Restaurant Removed From Favorites</h3>
                    </div>
                )}
            </div>


        </div>

    );
};

export default Restaurant;