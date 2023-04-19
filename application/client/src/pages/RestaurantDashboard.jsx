// this file is the main page for the restaurant dashboard
// it allows the restaurant to add menu items and view their orders
// it also allows the restaurant to send the request to the driver to pick up the order

import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context'
import axios from 'axios'
import '../styles/RestaurantDashboard.css'

const RestaurantDashboard = (props) => {
  const { restaurantId } = useContext(UserContext)

  const [restaurantName, setRestaurantName] = useState('')
  const [restaurantCuisine, setRestaurantCuisine] = useState('')
  const [restaurantDescription, setRestaurantDescription] = useState('')
  const [restaurantEstDeliveryTime, setRestaurantEstDeliveryTime] = useState('')
  const [restaurantAddress, setRestaurantAddress] = useState('')
  const [restaurantPicture, setRestaurantPicture] = useState('')
  const [restaurantPhone, setRestaurantPhone] = useState('')
  const [restaurantHours, setRestaurantHours] = useState('')
  const [restaurantMenuItems, setRestaurantMenuItems] = useState([])
  const [restaurantOrders, setRestaurantOrders] = useState([])

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/restaurants/restaurant/${restaurantId}`,
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
    fetchRestaurant()
  }, [restaurantId])
  console.log('Restaurant Name:', restaurantName)
  console.log('Restaurant Cuisine:', restaurantCuisine)
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/restaurants/getMenu/${restaurantId}`,
        )
        setRestaurantMenuItems(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchMenuItems()
  }, [restaurantId])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/orders/restaurant/${restaurantId}`,
        )
        console.log('Fetched orders:', response.data)
        setRestaurantOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchOrders()
  }, [restaurantId])

  return (
    <div className="restaurant-dashboard">
      <h1>Restaurant Dashboard</h1>
      <div className="restaurant-info">
        <h2>Restaurant Info</h2>
        <div className="restaurant-info-item">
          <h3>Restaurant Name</h3>
          <p>{restaurantName}</p>
        </div>
        <div className="restaurant-info-item">
          <h3>Cuisine</h3>
          <p>{restaurantCuisine}</p>
        </div>
        <div className="restaurant-info-item">
          <h3>Description</h3>
          <p>{restaurantDescription}</p>
        </div>
        <div className="restaurant-info-item">
          <h3>Estimated Delivery Time</h3>
          <p>{restaurantEstDeliveryTime}</p>
        </div>
        <div className="restaurant-info-item">
          <h3>Address</h3>
          <p>{restaurantAddress}</p>
        </div>
        <div className="restaurant-info-item">
          <img src={restaurantPicture} alt="restaurant" />
          <style jsx>{`
            img {
              width: 200px;
              height: 200px;
            }
          `}</style>
        </div>
        <div className="restaurant-info-item">
          <h3>Phone</h3>
          <p>{restaurantPhone}</p>
        </div>
        <div className="restaurant-info-item">
          <h3>Hours</h3>
          <p>{restaurantHours}</p>
        </div>
      </div>
      <div className="restaurant-menu">
        <h2>Menu</h2>
        <div className="restaurant-menu-item">
          <h3>Menu Item Name</h3>
          <h3>Price</h3>
          <h3>Description</h3>
        </div>
        {restaurantMenuItems.map((menuItem) => (
          <div className="restaurant-menu-item">
            <p>{menuItem.name}</p>
            <p>{menuItem.price}</p>
            <p>{menuItem.description}</p>
          </div>
        ))}
      </div>
      <div className="restaurant-orders">
        <h2>Orders</h2>
        <div className="restaurant-orders-item">
          <h3>Order ID</h3>
          <h3>Customer ID</h3>
          <h3>Order Status</h3>
          <h3>Order Total</h3>
          <h3>Order Items</h3>
          <h3>Order Date</h3>
          <h3>Delivery Address</h3>
          <h3>Payment Method</h3>
          <h3>Special Instructions</h3>
          
        </div>
        {restaurantOrders.map((order) => (
          <div className="restaurant-orders-item">
            <p>{order.order_id}</p>
            <p>{order.customer_id}</p>
            <p>{order.order_status}</p>
            <p>{order.order_total}</p>
            <p>{order.order_items}</p>
            <p>{order.order_date}</p>
            <p>{order.delivery_address}</p>
            <p>{order.payment_method}</p>
            <p>{order.special_instructions}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantDashboard
