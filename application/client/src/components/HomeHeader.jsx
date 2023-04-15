import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import UserContext from '../userContext'

const HomeHeader = ({ scrollToSecondPage }) => {
  const [favoritedRestaurants, setFavoritedRestaurants] = useState([])
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
      }

      fetchRestaurants()
    }
  }, [user])

  return (
    <div className="home-header-div">
      {/* <div className='featured-restaurants'>
                {featuredRestaurants.map((restaurant) => (
                    <div key={restaurant.id} className='restaurant'>
                        <p>placeholder for featured</p>
                    </div>
                ))}
            </div> */}

      <div className="favorited-restaurants">
        {favoritedRestaurants.map((restaurant, index) => (
          <div key={index} className="restaurant">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeHeader
