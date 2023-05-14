/**
 * Project Title: FoodFeast - Full Stack Web Application
 *
 * Filename: RestaurantDashboard.jsx
 * Created on: 04/23
 * Author(s): Alex D.
 * Contact: adiaz41@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 *
 * Description: main page for the restaurant dashboard, it allows the restaurant to add menu
 *    items and view their orders, it also allows the restaurant to send the request to the
 *    driver to pick up the order
 *
 */
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../context'
import axios from 'axios'
import '../styles/RestaurantDashboard.css'

const RestaurantDashboard = (props) => {
  const { restaurantId } = useContext(UserContext)
  const navigate = useNavigate()

  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantCuisine, setRestaurantCuisine] = useState('')
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantEstDeliveryTime, setRestaurantEstDeliveryTime] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantPicture, setRestaurantPicture] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')
  const [restaurantHours, setRestaurantHours] = useState('')
  const [restaurantMenuItems, setRestaurantMenuItems] = useState([])

  const goToOrdersPage = () => {
    navigate('/RestaurantOrders')
  }

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/restaurants/getRestaurantById/${restaurantId}`,
        )
        console.log('Fetched restaurant data:', response.data)

        setRestaurantName(response.data.name)
        setRestaurantCuisine(response.data.cuisine)
        setRestaurantDescription(response.data.description)
        setRestaurantEstDeliveryTime(response.data.est_delivery_time)
        setRestaurantAddress(response.data.address)
        setRestaurantPicture(response.data.picture)
        setRestaurantPhone(response.data.phone)
        setRestaurantHours(response.data.hours)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/restaurants/getMenu/${restaurantId}`,
        )
        console.log('Fetched menu items:', response.data)
        setRestaurantMenuItems(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (restaurantId) {
      fetchRestaurant()
      fetchMenuItems()
    }

  }, [restaurantId])


  return (
    <div className="restaurant-dashboard">
      <div className="restaurant-name">
        <h3>Welcome, {restaurantName}!</h3>
      </div>
      <div className="orders-page-button">
        <button onClick={goToOrdersPage}>Orders Page</button>
      </div>
      <div className="restaurant-info-item">
        <h3>Cuisine: {restaurantCuisine}</h3>
      </div>
      <div className="restaurant-info-item">
        <h3>Description: {restaurantDescription}</h3>
      </div>
      <div className="restaurant-info-item">
        <h3>Estimated Delivery Time: {restaurantEstDeliveryTime}</h3>
      </div>
      <div className="restaurant-info-item">
        <h3>Address: {restaurantAddress}</h3>
      </div>
      <div className="restaurant-info-item">
        <h3>Photo: </h3>
        <img
          src={restaurantPicture}
          alt="restaurant"
          className="restaurant-img-thumb"
        />
      </div>
      <div className="restaurant-info-item">
        <h3>Phone: {restaurantPhone}</h3>
      </div>
      <div className="restaurant-info-item">
        <h3>Hours: {restaurantHours}</h3>
      </div>
      <div className="restaurant-menu">
        <h2>Menu</h2>

        {restaurantMenuItems.map((menuItem, index) => (
          <div key={index} className="restaurant-menu-item">
            <p>Menu item name: {menuItem.name}</p>
            <p>Price: {menuItem.price}</p>
            <p>Description: {menuItem.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantDashboard
