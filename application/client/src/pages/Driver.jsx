/**
 * Project Title: FoodFeast - Full Stack Web Application
 *
 * Filename: Driver.jsx
 * Created on: 04/23
 * Author(s): Jed Graves, Alex D.
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
import { UserContext } from '../context'
import '../styles/Driver.css'
import Map from './Map'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import DriverRegister from '../components/Driver/DriverRegister'
import BecomeDriver from '../components/Driver/BecomeDriver'

function Driver() {
  const { user, restaurantId } = useContext(UserContext)
  const [socket, setSocket] = useState(null)
  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders')
    return storedOrders ? JSON.parse(storedOrders) : []
  })
  const [orderStatus, setOrderStatus] = useState(null)
  const [isOrderPickedUp, setIsOrderPickedUp] = useState(false)
  const [acceptedOrder, setAcceptedOrder] = useState(null)

  const [showMap, setShowMap] = useState(0)

  const acceptOrder = async (order, socket) => {
    if (acceptedOrder) {
      alert('Please complete current order first')
      return
    }

    try {
      const response = await fetch('/orders/setOrderAcceptedByDriver', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: order.order_id }),
      })

      if (response.ok) {
        socket.emit(
          'acceptOrder',
          { ...order, order_status: 'In Progress' },
          user.id,
        )

        setAcceptedOrder({ ...order, order_status: 'In Progress' })
        setOrderStatus('In Progress')
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
      const response = await fetch('/orders/unaccepted')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }, [])

  const markOrderAsDelivered = async (orderId) => {
    try {
      const response = await fetch(`/orders/markAsDelivered/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setAcceptedOrder(null)
      } else {
        console.error('Error marking order as delivered:', response)
      }
    } catch (error) {
      console.error('Error marking order as delivered:', error)
    }
  }

  const markOrderPickedUp = async (orderId) => {
    try {
      const response = await fetch(`/orders/markAsPickedUp/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setIsOrderPickedUp(true)
        setAcceptedOrder((prevState) => ({
          ...prevState,
          order_status: 'Out for Delivery',
        }))
      } else {
        console.error('Error marking order as picked up:', response)
      }
    } catch (error) {
      console.error('Error marking order as picked up:', error)
    }
  }

  useEffect(() => {
    if (!user || !user.isDriver || !socket) return

    socket.on('acceptedOrder', (newOrder) => {
      setOrders((prevOrders) => [...prevOrders, newOrder])
    })

    return () => {
      socket.off('acceptedOrder')
    }
  }, [socket, user])

  useEffect(() => {
    if (!user || !user.isDriver) return

    const newSocket = io('/')
    setSocket(newSocket)
    newSocket.emit('joinDriverRoom', `driver-${user.id}`, user.id)

    fetchAllOrders()

    return () => {
      newSocket.disconnect()
    }
  }, [user, fetchAllOrders])

  useEffect(() => {
    if (!socket) return

    socket.on('newOrderForDriver', async (order) => {
      const response = await fetch(
        `/orders/checkOrderAcceptedByDriver/${order.order_id}`,
      )
      const data = await response.json()

      if (!data.order_accepted_by_driver) {
        setOrders((prevOrders) => {
          const orderExists = prevOrders.some(
            (prevOrder) => prevOrder.order_id === order.order_id,
          )
          if (orderExists) {
            return prevOrders
          } else {
            return [...prevOrders, order]
          }
        })
      }
    })

    return () => {
      socket.off('newOrderForDriver')
    }
  }, [socket])

  if (!user) {
    return (
      <div className="admin">
        <DriverRegister />
      </div>
    )
  }

  const isDriver = user ? user.isDriver : false

  const acceptOrderWithSocket = async (order) => {
    await acceptOrder(order, socket)
    setOrders((prevOrders) =>
      prevOrders.filter((o) => o.order_id !== order.order_id),
    )
  }

  const unacceptedOrdersSidebar = (
    <div className="driver-unaccepted-orders-sidebar">
      {orders
        .filter(
          (order) =>
            (order.order_status === 'In Progress' ||
              order.order_status === 'Ready for Pickup') &&
            order.order_accepted_by_driver === 0,
        )
        .map((order, index) => (
          <div key={index} className="driver-unaccepted-order">
            <div>Order ID: {order.order_id}</div>
            <div>Restaurant Name: {order.name}</div>
            <div>Est. Delivery Time: {order.est_delivery_time} minutes</div>
            <div>Restaurant Phone: {order.phone}</div>
            <button
              className="driver-accept-order-button"
              onClick={() => acceptOrderWithSocket(order)}
            >
              Accept
            </button>
          </div>
        ))}
      {!orders && (
        <div className="driver-orders-container">
          <h2>No order accepted yet</h2>
        </div>
      )}
    </div>
  )

  const acceptedOrderDisplay = acceptedOrder ? (
    <div className="driver-orders-container">
      <div className="driver-accepted-order">
        <h2>Accepted Order</h2>
        <p>Order ID: {acceptedOrder.order_id}</p>
        <p>Restaurant Name: {acceptedOrder.name}</p>
        <p>Order Total: {acceptedOrder.order_total}</p>
        <p>Order Placed at: {acceptedOrder.order_date}</p>
        <p>Special Instructions: {acceptedOrder.special_instructions}</p>
        {acceptedOrder.order_status === 'In Progress' && (
          <button
            className="order-picked-up-button"
            onClick={() => markOrderPickedUp(acceptedOrder.order_id)}
          >
            Mark as Picked Up
          </button>
        )}
        {acceptedOrder.order_status === 'Out for Delivery' && (
          <button
            className="order-complete-button"
            onClick={() => markOrderAsDelivered(acceptedOrder.order_id)}
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="driver-orders-container">
      <h2>No order accepted yet</h2>
    </div>
  )

  const handleShowMap = (state) => {
    setShowMap(0)

    if (showMap !== state.value) {
      setShowMap(state.value)
    }
  }

  return (
    <div className="driverName">
      {user && isDriver ? (
        <div className="driver-container">
          <div className="driver-header">
            <h2>Accept an order to Deliver:</h2>

            <div className="driver-map-button">
              <button onClick={() => handleShowMap({ value: 1 })}>
                Campus Map
              </button>
              <button onClick={() => handleShowMap({ value: 2 })}>
                Map Near Me
              </button>
            </div>
          </div>

          <div className="driver-page">
            <>
              {unacceptedOrdersSidebar}
              <div className="driver-left">
                {acceptedOrderDisplay}

                <div className="campus-map">
                  {showMap === 1 && (
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/brand/CampusMap.png'
                      }
                      alt="Campus Map"
                    />
                  )}
                </div>

                {showMap === 2 && <Map />}
              </div>
            </>
          </div>
        </div>
      ) : (
        <BecomeDriver />
      )}
    </div>
  )
}

export default Driver
