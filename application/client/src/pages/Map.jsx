import React, { useState, useEffect } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import axios from 'axios'
import { Link } from 'react-router-dom'

const apiKey = 'AIzaSyDV-F6ADu9wNi12fMyIxMMjUnnfquIV_50'

// Map does not run into footer
const containerStyle = {
  width: '100%',
  height: '87vh',
}

// Center at SFSU
const center = {
  lat: 37.7261723,
  lng: -122.4799151,
}

// Fetch all restaurant data from the API
async function getAllRestaurants() {
  try {
    const response = await axios.get('/restaurants/getAllRestaurants')
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

function Map() {
  const [restaurants, setRestaurants] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  // Fetch restaurants and their coordinates when the component mounts
  useEffect(() => {
    const fetchRestaurantsAndCoordinates = async () => {
      const restaurantData = await getAllRestaurants()

      // Update the restaurant objects with their coordinates
      Promise.all(
        restaurantData.map(async (restaurant) => {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              restaurant.address,
            )}&key=${apiKey}`,
          )
          const data = await response.json()
          if (data.results[0]) {
            return {
              ...restaurant,
              position: data.results[0].geometry.location,
            }
          }
          return null
        }),
      ).then((updatedRestaurants) => {
        // Store updated restaurant objects in the state
        setRestaurants(updatedRestaurants.filter((r) => r !== null))
      })
    }

    fetchRestaurantsAndCoordinates()
  }, [])

  // Handler for when a marker is hovered
  const onMarkerHover = (restaurant) => {
    setSelectedRestaurant(restaurant)
  }

  // Handler for closing the InfoWindow
  const onInfoWindowCloseClick = () => {
    setSelectedRestaurant(null)
  }

  // Render the Google Map component with markers and the InfoWindow
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={() => setSelectedRestaurant(null)}
      >
        {/* Render a Marker for each restaurant */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={restaurant.position}
            onMouseOver={() => onMarkerHover(restaurant)}
          />
        ))}

        {/* Render an InfoWindow for the selected restaurant */}
        {selectedRestaurant && (
          <InfoWindow
            position={selectedRestaurant.position}
            onCloseClick={onInfoWindowCloseClick}
          >
            <div className="info-window">
              <h2 className="info-window-name">{selectedRestaurant.name}</h2>
              <img
                className="thumbnail"
                src={selectedRestaurant.picture}
                alt={`${selectedRestaurant.name}`}
              />
              <p className="info-window-rating">
                rating: {selectedRestaurant.rating}
              </p>
              {/* Link to the restaurant's menu */}
              <Link
                to={`/restaurants/${selectedRestaurant.id}`}
                className="view-menu-link"
              >
                View Menu
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
