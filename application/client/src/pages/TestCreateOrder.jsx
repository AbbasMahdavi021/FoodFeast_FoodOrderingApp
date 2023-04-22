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
