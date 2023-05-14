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
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import '../styles/MenuItem.css';

const Restaurant = (props) => {

    const { id } = useParams();
    const [restaurant, setRestaurant] = useState([]);
    const [newItem, setNewItem] = useState([]);

    useEffect(() => {

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

    }, [id]);

    return (
        <div className='restaurant-page'>

            <div className='restaurant-header-div'>
                <img className='restaurant-banner' src={restaurant.picture} alt={restaurant.name} />
                <div className="restaurant-menu-details">
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.price}</p>
                    <p>{restaurant.cuisine_name}</p>
                    <h1>{restaurant.description}</h1>
                    <p>
                        {[...Array(5)].map((star, i) => {
                            if (i < restaurant.rating) {
                                return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star1.png'} alt="star" />;
                            } else {
                                return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star2.png'} alt="star" />;
                            }
                        })}
                    </p>
                    <p>{restaurant.est_delivery_time - 5}-{restaurant.est_delivery_time} mins</p>
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
                            />
                        )
                    })}
                </div>
            </div>


        </div>

    );
};

export default Restaurant;