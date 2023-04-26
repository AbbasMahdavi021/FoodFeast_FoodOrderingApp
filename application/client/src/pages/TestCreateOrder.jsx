/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: TestCreateOrder.jsx
 * Created on: 04/23
 * Author(s): Alex D., Abbas M.
 * Contact: adiaz41@sfsu.edu, amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: React functional component that serves as a simple testing interface for 
 *    creating orders. The component initializes a Socket.io client to communicate with a 
 *    server located at 'http://localhost:8080'. It renders a form with a single 'Create Order' 
 *    button that, when clicked, sends a hardcoded POST request to the '/orders' endpoint using axios. 
 *    Upon receiving a successful response, the component emits a 'send-order' event through the socket, 
 *    passing the newly created order data.
 * 
 */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'

const TestCreateOrder = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const customerId = 15
    const restaurantId = 5

    try {
      const response = await axios.post('http://localhost:8080/orders', {
        customerId,
        restaurantId,
        orderDate: new Date().toISOString(),
        orderStatus: 'Pending',
        orderTotal: 25.5,
        deliveryAddress: '1234 Test St',
        paymentMethod: 'Credit Card',
        specialInstructions: 'Leave at the door',
      })

      console.log(response.data)

      if (socket) {
        socket.emit('send-order', response.data, `restaurant-${restaurantId}`)
      }

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <h2>Test Create Order</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Create Order</button>
      </form>
    </div>
  )
}

export default TestCreateOrder
