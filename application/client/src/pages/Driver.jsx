/**
 * Project Title: FoodFeast - Full Stack Web Application
 *
 * Filename: Driver.jsx
 * Created on: 04/23
 * Author(s):
 * Contact:
 * Copyright (c) 2023 by San Francisco State University
 *
 * Description: Conditionally renders the driver name if the user is a driver
 *   or a link to register as a driver if the user is not a driver.
 *   Other driver and user data can be retrieved this way as well.
 *   To fetch additional data from the db, modify the Login.jsx file.
 */

import React, { useContext, useEffect, useState, useCallback } from 'react'
import { io } from 'socket.io-client'
import UserContext from '../context'
import '../styles/Driver.css'
import Map from './Map'
import DriverRegister from '../components/Driver/DriverRegister'

function Driver() {
  const { user, restaurantId } = useContext(UserContext)
  const [socket, setSocket] = useState(null)
  const [orders, setOrders] = useState([])

  const [acceptedOrder, setAcceptedOrder] = useState(null)

  const acceptOrder = async (order) => {
    try {
      const response = await fetch(
        'http://localhost:8080/orders/setOrderAcceptedByDriver',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: order.order_id }),
        },
      )

      if (response.ok) {
        setAcceptedOrder(order)
        setOrders((prevOrders) =>
          prevOrders.filter((o) => o.order_id !== order.order_id),
        )
      } else {
        console.error('Error accepting order:', response)
      }
    } catch (error) {
      console.error('Error accepting order:', error)
    }
  }

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/orders/unaccepted')
      const data = await response.json()
      console.log('orders fetched from server:', data)
      setOrders(data)
      console.log('Orders:', data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }, [])

  useEffect(() => {
    if (!user || !user.isDriver || !socket) return

    const handleNewOrder = (newOrder) => {
      if (newOrder.accepted_by_driver === 0) {
        setOrders((prevOrders) => [...prevOrders, newOrder])
      }
    }

    socket.on('newOrder', handleNewOrder)

    return () => {
      socket.off('newOrder', handleNewOrder)
    }
  }, [user, socket])

  useEffect(() => {
    if (!user || !user.isDriver) return

    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)
    newSocket.emit('joinDriverRoom')

    fetchAllOrders()

    return () => {
      newSocket.disconnect()
    }
  }, [user, fetchAllOrders])

  if (!user) {
    return (
      <div className="admin">
        <DriverRegister />
      </div>
    )
  }

  const isDriver = user ? user.isDriver : false

  const driverDashboard = (
    <div className="driver-dashboard">
      {orders
        .filter((order) => !order.accepted)
        .map((order, index) => (
          <div key={index}>
            <div className="order-info">
              <p>Order ID: {order.order_id}</p>
              <p>Restaurant Name: {order.name}</p>
              <p>Order Total: {order.order_total}</p>
              <p>Order Placed at: {order.order_date}</p>
              <p>Special Instructions: {order.special_instructions}</p>
            </div>
            <div className="order-accept">
              <p>Your Earnings For This Delivery: </p>
              <button
                className="driver-button"
                onClick={() => acceptOrder(order)}
              >
                Accept
              </button>{' '}
            </div>
          </div>
        ))}
    </div>
  )

  const acceptedOrderDisplay = acceptedOrder ? (
    <div className="accepted-order">
      <h2>Accepted Order</h2>
      <p>Order ID: {acceptedOrder.order_id}</p>
      <p>Restaurant Name: {acceptedOrder.name}</p>
      <p>Order Total: {acceptedOrder.order_total}</p>
      <p>Order Placed at: {acceptedOrder.order_date}</p>
      <p>Special Instructions: {acceptedOrder.special_instructions}</p>
    </div>
  ) : null

  return (
    <div className="driverName">
      {user && isDriver ? (
        <>
          {driverDashboard}
          {acceptedOrderDisplay}
          Welcome {user.username}!
        </>
      ) : (
        <p>
          This user is not a Driver: --Insert link to driver registration here--
        </p>
      )}
    </div>
  )
}

export default Driver
