import React, { useState, useEffect, useCallback } from 'react'
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

function RestaurantMarkers({ google }) {
  const [markers, setMarkers] = useState([])
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [restaurants, setRestaurants] = useState([])

  {markers.map((marker, index) => (
  <Marker
    key={index}
    position={marker.position}
    onClick={() => setSelectedRestaurant(marker)}
    zIndex={1000}
  />
))}


  useEffect(() => {
    FetchRestaurantsFromAPI()
  }, [])

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
        />
      ))}
      {selectedRestaurant && (
        <InfoWindow
          position={selectedRestaurant.position}
          onCloseClick={() => setSelectedRestaurant(null)}
        >
          <div>
            <h4>{selectedRestaurant.name}</h4>
            <p>{selectedRestaurant.address}</p>
          </div>
        </InfoWindow>
      )}
    </>
  )
}

function Map() {
  const [center, setCenter] = useState(null)

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

  return (
    <LoadScript googleMapsApiKey="AIzaSyDV-F6ADu9wNi12fMyIxMMjUnnfquIV_50">
      {center && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          <RestaurantMarkers google={window.google} />
        </GoogleMap>
      )}
    </LoadScript>
  )
}

export default Map
