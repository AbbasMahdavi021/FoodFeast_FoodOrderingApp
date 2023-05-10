import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../context'
import { io } from 'socket.io-client'
import axios from 'axios'
import '../styles/RestaurantOrders.css'

const RestaurantOrders = () => {
  const { restaurantId } = useContext(UserContext)

  const [orders, setOrders] = useState([])
  const [unacceptedOrders, setUnacceptedOrders] = useState([])
  const [socket, setSocket] = useState(null)
  const [collapsedOrders, setCollapsedOrders] = useState([])
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const [activeTab, setActiveTab] = useState('pending')
  const [orderItems, setOrderItems] = useState([])

  const toggleOrderVisibility = (orderId) => {
    if (collapsedOrders.includes(orderId)) {
      setCollapsedOrders(collapsedOrders.filter((id) => id !== orderId))
    } else {
      setCollapsedOrders([...collapsedOrders, orderId])
    }
  }

  const updateOrderStatus = async (orderId) => {
    const orderToUpdate = orders.find((order) => order.order_id === orderId)

    if (orderToUpdate.order_status === 'Ready for Pickup') {
      return
    }

    try {
      const newOrderStatus = 'Ready for Pickup'
      await axios.put('http://localhost:8080/orders/updateStatus', {
        orderId,
        orderStatus: newOrderStatus,
      })

      setOrders(
        orders.map((order) =>
          order.order_id === orderId
            ? { ...order, order_status: newOrderStatus }
            : order,
        ),
      )
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const acceptOrder = (orderId) => {
    setUnacceptedOrders(
      unacceptedOrders.filter((order) => order.order_id !== orderId),
    )
    setOrderInProgress(orderId)
    fetchOrderItems([orderId])
  }

  const setOrderInProgress = async (orderId) => {
    try {
      const newOrderStatus = 'In Progress'
      await axios.put('http://localhost:8080/orders/updateStatus', {
        orderId,
        orderStatus: newOrderStatus,
      })

      const updatedOrder = orders.find((order) => order.order_id === orderId)
      const updatedOrders = orders.map((order) =>
        order.order_id === orderId
          ? { ...order, order_status: newOrderStatus }
          : order,
      )
      setOrders(updatedOrders)

      const updatedOrderWithStatus = {
        ...updatedOrder,
        order_status: newOrderStatus,
      }

      socket.emit('acceptOrder', updatedOrderWithStatus)
      console.log('Emitted acceptOrder event:', updatedOrderWithStatus)
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  useEffect(() => {
    if (scrollToBottom) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      })
      setScrollToBottom(false)
    }
  }, [scrollToBottom])

  useEffect(() => {
    if (!restaurantId) return

    const newSocket = io('http://localhost:8080')
    setSocket(newSocket)
    newSocket.emit('joinRestaurantRoom', restaurantId)
    console.log('Sent joinRestaurantRoom event:', restaurantId)

    newSocket.on('newOrder', (newOrder) => {
      console.log('Received new order:', newOrder)
      setOrders((prevOrders) => [...prevOrders, newOrder])
      setUnacceptedOrders((prevUnacceptedOrders) => [
        ...prevUnacceptedOrders,
        newOrder,
      ])
      localStorage.setItem('lastReceivedOrderId', newOrder.order_id)
    })

    return () => {
      newSocket.off('receive-order')
      newSocket.close()
    }
  }, [restaurantId])

  useEffect(() => {
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
      fetchOrders()
    }
  }, [restaurantId])

  const fetchOrderItems = async (orderIds) => {
    try {
      const response = await Promise.all(
        orderIds.map((orderId) =>
          axios.get(`http://localhost:8080/orders/items/${orderId}`),
        ),
      )
      console.log('Fetched order items:', response)

      const newOrderItems = response.reduce((acc, orderItemRes, index) => {
        console.log('orderItemRes:', orderItemRes.data)
        acc[orderIds[index]] = orderItemRes.data
        return acc
      }, {})

      setOrderItems((prevOrderItems) => ({
        ...prevOrderItems,
        ...newOrderItems,
      }))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (orders.length > 0) {
      fetchOrderItems(orders.map((order) => order.order_id))
    }
  }, [orders])

  return (
    <div className="orders-page">
      <div className="unaccepted-orders-sidebar">
        <h2>Unaccepted Orders</h2>
        {unacceptedOrders.map((order) => (
          <div key={order.order_id} className="unaccepted-order">
            <p>Order ID: {order.order_id}</p>
            <button
              className="accept-order-button"
              onClick={() => acceptOrder(order.order_id)}
            >
              Accept Order
            </button>
          </div>
        ))}
      </div>
      <div className="orders-container">
        <div className="orders-tabs">
          <button
            className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Current Orders
          </button>
          <button
            className={`tab-button ${
              activeTab === 'completed' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Orders
          </button>
        </div>
        {orders
          .filter((order) =>
            activeTab === 'pending'
              ? order.order_status === 'Pending' ||
                order.order_status === 'In Progress'
              : order.order_status === 'Completed' ||
                order.order_status === 'Ready for Pickup',
          )
          .map((order) => (
            <div key={order.order_id} className="restaurant-orders-item">
              <h3 className="order-id">Order ID: {order.order_id}</h3>
              {!collapsedOrders.includes(order.order_id) && (
                <>
                  <p>Customer ID: {order.customer_id}</p>
                  <p className="status">Status: {order.order_status}</p>
                  <p>Total: {order.order_total}</p>
                </>
              )}

              {!collapsedOrders.includes(order.order_id) && (
                <div className="order-items-container">
                  <h4>Items in order:</h4>
                  {orderItems[order.order_id] &&
                    orderItems[order.order_id].map((item) => (
                      <div
                        key={item.order_item_id}
                        className="customer-orders-item"
                      >
                        <p>item id: {item.order_item_id}</p>
                        <p>price: {item.price}</p>
                        <p>special requests: {item.special_requests}</p>
                      </div>
                    ))}
                </div>
              )}
              {activeTab === 'pending' && (
                <button
                  className="order-complete-button"
                  onClick={() => {
                    toggleOrderVisibility(order.order_id)
                    updateOrderStatus(order.order_id)
                  }}
                >
                  Order Complete
                </button>
              )}
              {activeTab === 'completed' && (
                <button
                  className="order-complete-button"
                  onClick={() => {
                    toggleOrderVisibility(order.order_id)
                  }}
                >
                  Collapse Order
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default RestaurantOrders
