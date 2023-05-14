/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: RegisterForm.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: A component that renders the list of all or filtered restaurant based on Browse.jsx
 */


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantsContext } from './RestaurantsContext';

const RestaurantList = () => {

  const { restaurants } = useContext(RestaurantsContext);

  const restaurantsLength = restaurants.length;

  return (

    <div className='restaurant-list-div'>
      <h1>Showing {restaurantsLength} result(s)</h1>
      <div className="restaurant-container">
        {restaurants.map((restaurant) => {
          return (
            <Link key={restaurant.id} to={`${restaurant.name.replace(/\s/g, '')}/${restaurant.id}`}>
              <div className="restaurant-box">
                <img src={restaurant.picture} alt={restaurant.name} />
                <div className="restaurant-details">
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
            </Link>
          );
        })}
      </div>
    </div>

  );
};

export default RestaurantList;
