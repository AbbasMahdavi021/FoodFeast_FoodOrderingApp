// this file is the main page for the restaurant dashboard
// it allows the restaurant to add menu items and view their orders
// it also allows the restaurant to send the request to the driver to pick up the order

import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context'
import axios from 'axios'
import { io } from 'socket.io-client'
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
  const [orders, setOrders] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [socket, setSocket] = useState(null)
  const [orderItems, setOrderItems] = useState([])

  useEffect(() => {
    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)
    newSocket.emit('joinRestaurantRoom', 'restaurant-5')

    newSocket.on('receive-order', (newOrder) => {
      console.log('Received new order:', newOrder)
      setOrders((prevOrders) => [...prevOrders, newOrder])
    })

    return () => {
      newSocket.off('receive-order')
      newSocket.close()
    }
  }, [])

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

    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/orders/restaurant/${restaurantId}`,
        )
        console.log('Fetched orders:', response.data)
        setOrders(response.data)
      } catch (err) {
        console.error(err)
      }
    }

    if (restaurantId) {
      fetchRestaurant()
      fetchMenuItems()
      fetchOrders()
    }
  }, [restaurantId])

  useEffect(() => {
    if (orders.length > 0) {
      const fetchOrderItems = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/orders/items/${orders[0].order_id}`,
          )
          console.log('Fetched order items:', response.data)
          setOrderItems(response.data)
        } catch (err) {
          console.error(err)
        }
      }
      fetchOrderItems()
    }
  }, [orders])

  return (
    <div className="restaurant-dashboard">
      <h1 className='dash'>Restaurant Dashboard</h1>
  
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
        <img
          src={restaurantPicture}
          alt="restaurant"
          className="restaurant-img-thumb"
        />
      </div>
      <div className="restaurant-info-item">
        <h3>Phone</h3>
        <p>{restaurantPhone}</p>
      </div>
      <div className="restaurant-info-item">
        <h3>Hours</h3>
        <p>{restaurantHours}</p>
      </div>
      {/* Remove the extra closing </div> here */}
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
      <div className="restaurant-orders">
        <h2>Orders</h2>
        {orders.map((order) => (
          <div key={order.order_id} className="restaurant-orders-item">
            <p>-----------------------------------------------------------</p>
            <h3>Order ID: {order.order_id}</h3>
            <p>Customer ID: {order.customer_id}</p>
            <p>Status: {order.order_status}</p>
            <p>Total: {order.order_total}</p>
  
            <p>Items in order:</p>
            {orderItems
              .filter((item) => item.order_id === order.order_id)
              .map((item) => (
                <div
                  key={item.order_item_id}
                  className="customer-orders-item"
                >
                  <p>Order item</p>
                  <p>item id: {item.order_item_id}</p>
                  <p>price: {item.price}</p>
                  <p>special requests: {item.special_requests}</p>
                </div>
              ))}
          </div>
        ))}
        </div>
    </div>
  )
}


export default RestaurantDashboard
