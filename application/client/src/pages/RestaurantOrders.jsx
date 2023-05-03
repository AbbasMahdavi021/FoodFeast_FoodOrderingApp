import React, { useState, useEffect, useContext } from 'react'
import Modal from 'react-modal'
import UserContext from '../context'
import { io } from 'socket.io-client'
import axios from 'axios'
import '../styles/RestaurantOrders.css'

const RestaurantOrders = () => {
  const { restaurantId } = useContext(UserContext)

  const [orders, setOrders] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const [showOrderAlert, setShowOrderAlert] = useState(false)
  const [socket, setSocket] = useState(null)
  const [collapsedOrders, setCollapsedOrders] = useState([])
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const [activeTab, setActiveTab] = useState('pending')
  const [initialOrdersFetched, setInitialOrdersFetched] = useState(false);

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

      socket.emit('orderInProgress', updatedOrderWithStatus)
      console.log('Emitted orderInProgress event:', updatedOrderWithStatus)
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
      localStorage.setItem('lastReceivedOrderId', newOrder.order_id)
      setShowOrderAlert(true)
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
      fetchOrders().then(() => {
        setInitialOrdersFetched(true);
      });
    }
  }, [restaurantId, showOrderAlert])

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

  useEffect(() => {
    if (orders.length > 0 && initialOrdersFetched) {
      const lastReceivedOrderId = localStorage.getItem('lastReceivedOrderId');
      if (
        lastReceivedOrderId &&
        parseInt(lastReceivedOrderId) !== orders[orders.length - 1].order_id
      ) {
        setShowOrderAlert(true);
      }
    }
  }, [orders, initialOrdersFetched]);
  

  return (
    <div className="orders-page">
      <Modal
        isOpen={showOrderAlert}
        onRequestClose={() => {
          setShowOrderAlert(false)
        }}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>New Order Received!</h2>
        <button
          onClick={() => {
            setShowOrderAlert(false)
            if (orders.length > 0) {
              setOrderInProgress(orders[orders.length - 1].order_id)
            }
            setScrollToBottom(true)
          }}
        >
          Close
        </button>
      </Modal>
      <div className="orders-tabs">
        <button
          className={`tab-button ${
            activeTab === 'pendingOrders' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('pendingOrders')}
        >
          Current Orders
        </button>
        <button
          className={`tab-button ${
            activeTab === 'completedOrders' ? 'active' : ''
          }`}
          onClick={() => setActiveTab('completedOrders')}
        >
          Completed Orders
        </button>
      </div>

      {orders
        .filter((order) =>
          activeTab === 'pendingOrders'
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
                {orderItems
                  .filter((item) => item.order_id === order.order_id)
                  .map((item) => (
                    <div
                      key={item.order_item_id}
                      className="customer-orders-item"
                    >
                      <p>item id: {item.order_item_id}</p>
                      <p>item name: {item.item_name}</p>
                      <p>price: {item.price}</p>
                      <p>special requests: {item.special_requests}</p>
                    </div>
                  ))}
              </div>
            )}
            <button
              className="order-complete-button"
              onClick={() => {
                toggleOrderVisibility(order.order_id)
                updateOrderStatus(order.order_id)
              }}
            >
              Order Complete
            </button>
          </div>
        ))}
    </div>
  )
}

export default RestaurantOrders
