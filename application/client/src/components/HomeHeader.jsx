/*
 * Featured restaurants can be set manually in the database by setting the  
 * featured flag to 1. Possibly have a way for admin to set featured restaurants
 * in the future.
 * Currently, adding new favorites is not implemented, but can be set in the db.
 * You can pull any of the restaurant info to display on the home page. 
 */

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from '../userContext'

const HomeHeader = ({ scrollToSecondPage }) => {
  const [favoritedRestaurants, setFavoritedRestaurants] = useState([])
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const { user } = useContext(UserContext)

  // get the stored user id from the context
  console.log('user in context', user)

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        try {
          const favoritedRes = await axios.get(
            `http://localhost:8080/favorites/${user.id}`,
          )

          setFavoritedRestaurants(favoritedRes.data)
          console.log('favorite restaurants', favoritedRes.data)
        } catch (error) {
          console.error(error)
        }
        try {
          const featuredRes = await axios.get(
            `http://localhost:8080/featured`,
          )

          setFeaturedRestaurants(featuredRes.data)
          console.log('featured restaurants', featuredRes.data)
        } catch (error) {
          console.error(error)
        }
      }

      fetchRestaurants()
    }
  }, [user])

  return (
    <div className="home-header-div">
      <div className="featured-restaurants">
        {featuredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant">
            <h1>featured Restaurants:</h1>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>

      <div className="favorited-restaurants">
        {favoritedRestaurants.map((restaurant, index) => (
          <div key={index} className="restaurant">
            <h1>Favorite Restaurants:</h1>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeHeader
