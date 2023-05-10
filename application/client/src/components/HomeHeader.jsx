/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: HomeHeader.jsx
 * Created on: 04/23
 * Author(s): Jed G., Megan L., Nathan R., Abbas M.
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Featured restaurants can be set manually in the database by setting the  
 *    featured flag to 1. Possibly have a way for admin to set featured restaurants
 *    in the future.
 *    Currently, adding new favorites is not implemented, but can be set in the db.
 *    You can pull any of the restaurant info to display on the home page. 
 */
import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import UserContext from '../context'
import { Link } from 'react-router-dom';



const HomeHeader = ({ scrollToSecondPage }) => {
  const [favoritedRestaurants, setFavoritedRestaurants] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {

    const fetchRestaurants = async () => {

      if (user) {
        try {
          const favoritedRes = await axios.get(
            `/favorites/${user.id}`,
          )

          setFavoritedRestaurants(favoritedRes.data)
        } catch (error) {
          console.error(error)
        }
      }

      try {
        const featuredRes = await axios.get(
          `/restaurants/getFeatured`,
        )

        setFeaturedRestaurants(featuredRes.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRestaurants()

  }, [user])

  return (
    <div className="home-header-div">

      <div className='home-header'>
        <div className='text-container'>
          <h1>Meals made simple.</h1>
          <h1>Food delivered anywhere </h1>
          <h1>on campus.</h1>
          <h1>Exclusive use for SFSU </h1>
          <h1>Students, Staff, & Faculty.</h1>
        </div>
        <div className='food-plate'>
          <img src={process.env.PUBLIC_URL + '/images/brand/food-dish.png'} alt="Plate" />
        </div>
      </div>

      <div className="featured-favorite-container">
        <div className="f-restaurants">
          <h1 id='f-restaurant-h1'>Featured Restaurants</h1>
          <div className="restaurant-f-container">
            {featuredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`${restaurant.name.replace(/\s/g, '')}/${restaurant.id}`}>
                <div key={restaurant.id} className="restaurant-f">
                  <img className="restaurant-f-img" src={restaurant.picture} alt={restaurant.name} />
                  <div className="restaurant-f-text">
                    <h3>{restaurant.name}</h3>
                    <div className="restaurant-f-starbox">
                      {[...Array(5)].map((star, i) => {
                        if (i < restaurant.rating) {
                          return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star1.png'} alt="star" />;
                        } else {
                          return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star2.png'} alt="star" />;
                        }
                      })}
                      <span>{restaurant.est_delivery_time - 5}-{restaurant.est_delivery_time} mins</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {user ?
          <div className="f-restaurants" id='favorite-restaurants'>
            <h1 id='f-restaurant-h1'>Favorite Restaurants</h1>
            <div className="restaurant-f-container">
              {favoritedRestaurants.map((restaurant) => (
                <Link key={restaurant.id} to={`${restaurant.name.replace(/\s/g, '')}/${restaurant.id}`}>
                  <div key={restaurant.id} className="restaurant-f">
                    <img className="restaurant-f-img" src={restaurant.picture} alt={restaurant.name} />
                    <div className="restaurant-f-text">
                      <h3>{restaurant.name}</h3>
                      <div className="restaurant-f-starbox">
                        {[...Array(5)].map((star, i) => {
                          if (i < restaurant.rating) {
                            return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star1.png'} alt="star" />;
                          } else {
                            return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star2.png'} alt="star" />;
                          }
                        })}
                        <span>{restaurant.est_delivery_time - 5}-{restaurant.est_delivery_time} mins</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          : null
        }
      </div>
    </div>
  )
}

export default HomeHeader
