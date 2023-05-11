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

import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import UserContext from '../context';
import '../styles/Driver.css';
import Map from './Map';
import DriverRegister from '../components/Driver/DriverRegister';

function Driver() {
  const { user, restaurantId } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user || !user.isDriver) return;
  
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);
    console.log('Driver socket connection established:', newSocket);
  
    // Check if the socket is already connected
    if (newSocket.connected) {
      newSocket.emit('joinDriverRoom', 'drivers');
      console.log('Sent joinDriverRoom event');
    } else {
      // Otherwise, wait for the connect event before emitting joinDriverRoom
      newSocket.on('connect', () => {
        newSocket.emit('joinDriverRoom', 'drivers');
        console.log('Sent joinDriverRoom event after connecting');
      });
    }
  
    newSocket.on('orderInProgress', (order) => {
      console.log('Order in progress received:', order);
      setOrders((prevOrders) => [...prevOrders, order]);
    });
  
    return () => {
      newSocket.off('orderInProgress');
      newSocket.close();
    };
  }, [user]);
  

  if (!user) {
    return (
      <div className='admin'>
        <DriverRegister />
      </div>
    );
  }

  const isDriver = user ? user.isDriver : false;
  

  const driverDashboard = (
    <div className='driver-dashboard'>

      <p> Welcome {user.username} </p>

      {orders.map((order, index) => (
        <div key={index}>
          <div className='order-info'>
            <p>Order ID: {order.order_id}</p>
            <p>Restaurant Name: {order.name}</p>
            <p>Order Total: {order.order_total}</p>
            <p>Order Placed at: {order.order_date}</p>
            <p>Special Instructions: {order.special_instructions}</p>
          </div>
          <div className='order-accept'>
            {/* Next step: calculate driver pay based on percentage of total.
            then, "driver button" needs to trigger directions to restaurant,
            and once the driver has picked up the order and the order status changes
            from ready to pick up, to out for delivery, directions to the delivery
            address. also when the driver accepts the delivery, the order should no
            longer be available to other drivers. */}
            <p>Your Earnings For This Delivery: $5.50</p>
            <button className='driver-button'>Accept</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className='driverName'>
      {user && isDriver ? (
        driverDashboard
      ) : (
        <p>
          This user is not a Driver: --Insert link to driver registration
          here--
        </p>
      )}
    </div>
  );
}

export default Driver;
