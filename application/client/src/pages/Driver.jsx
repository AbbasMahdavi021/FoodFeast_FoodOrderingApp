/*
 *   Conditionally renders the driver name if the user is a driver 
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
        <p> Deliver By: 8:50 </p>
        <p> Restaurant Name </p>
        <p> Number of Items </p>
      </div>
      <div className='order-accept'>
        <p> $20.56 </p>
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
