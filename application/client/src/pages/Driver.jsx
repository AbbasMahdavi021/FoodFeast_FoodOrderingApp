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

import React, { useContext, useEffect } from 'react';
import UserContext from '../context';
import '../styles/Driver.css';
import Map from './Map';
import DriverRegister from '../components/Driver/DriverRegister';


function Driver() {
  const { user } = useContext(UserContext);

  if (!user) {
    return (
      <div className='admin'>
        <DriverRegister />
      </div>
    )
  }

  const isDriver = user && user.isDriver;

  const driverDashboard = (
    <div className='driver-dashboard'>
      <div className='driver-map'>
        <Map />
      </div>
      <div className='order-info'>
        <p> Restaurant Name: Roti Bistro</p>
        <p> Number of Items: 4</p>
        <p> Deliver By: 4:30pm </p>
      </div>
      <div className='order-accept'>
        <p>Your Earnings For This Delivery: $5.50 </p>
        <button className='driver-button'> Accept </button>
      </div>
    </div>
  );

  return (
    <div className='driverName'>
      {isDriver ? (
        driverDashboard
      ) : (
        <p>This user is not a Driver: --Insert link to driver registration here--</p>
      )}
    </div>
  );
}

export default Driver;
