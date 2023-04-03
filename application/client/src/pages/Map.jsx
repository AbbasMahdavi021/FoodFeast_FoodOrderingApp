import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100vh',
}

function RestaurantMarkers({ google, selectedRestaurant, setSelectedRestaurant }) {
  const [markers, setMarkers] = useState([])
  const [restaurants, setRestaurants] = useState([])

  async function FetchRestaurantsFromAPI() {
    try {
      const response = await fetch('/restaurants/getAllRestaurants')
      const data = await response.json()
      console.log(data)
      setRestaurants(data)
    } catch (error) {
      console.error('Error fetching restaurant data:', error)
    }
  }

  useEffect(() => {
    FetchRestaurantsFromAPI()
  }, [])

  const geocodeRestaurants = useCallback(async () => {
    if (!google) return

    const geocoder = new google.maps.Geocoder()

    const geocodeRestaurant = (restaurant) => {
      return new Promise((resolve) => {
        geocoder.geocode({ address: restaurant.address }, (results, status) => {
          if (status === 'OK') {
            const location = results[0].geometry.location
            resolve({
              name: restaurant.name,
              address: restaurant.address,
              rating: restaurant.rating,
              picture: restaurant.picture,
              position: { lat: location.lat(), lng: location.lng() },
            })
          } else {
            console.error('Geocode error:', status)
            resolve(null)
          }
        })
      })
    }

    const geocodedRestaurants = await Promise.all(
      restaurants.map((restaurant) => geocodeRestaurant(restaurant)),
    )

    setMarkers(geocodedRestaurants.filter((restaurant) => restaurant !== null))
  }, [google, restaurants])

  useEffect(() => {
    geocodeRestaurants()
  }, [geocodeRestaurants, restaurants])

  return (
    <>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => setSelectedRestaurant(marker)}
          onMouseOver={() => setSelectedRestaurant(marker)}
          zIndex={1000}
        />
      ))}
      {selectedRestaurant && (
        <InfoWindow
          position={selectedRestaurant.position}
          onCloseClick={() => setSelectedRestaurant(null)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
        >
          <div className="custom-info-window">
            <div className="info-window-name">{selectedRestaurant.name}</div>
            <img
              src={selectedRestaurant.picture}
              alt={selectedRestaurant.name}
              className="thumbnail"
            />
            <div className="info-window-rating">
              rating: {selectedRestaurant.rating}
            </div>
            {(() => {
              const [street, city, state] = selectedRestaurant.address.split(',')
              return (
                <>
                  <p>{street.trim()}</p>
                  <p>{city.trim()}, {state.trim()}</p>
                </>
              )
            })()}
            <Link
              to={`/restaurants/${selectedRestaurant.name}`}
              className="view-menu-link"
            >
              View Menu
            </Link>
          </div>
        </InfoWindow>
      )}
    </>
  )
}


function Map() {
  const [center, setCenter] = useState(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error('Error getting user location:', error)
        },
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [])

  function handleMapClick() {
    setSelectedRestaurant(null)
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyDV-F6ADu9wNi12fMyIxMMjUnnfquIV_50">
      {center && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          onClick={handleMapClick}
        >
          <RestaurantMarkers
            google={window.google}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        </GoogleMap>
      )}
    </LoadScript>
  )
}

export default Map
