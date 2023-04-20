/*
 *   Conditionally renders the driver name if the user is a driver 
 *   or a link to register as a driver if the user is not a driver.
 *   Other driver and user data can be retrieved this way as well. 
 *   To fetch additional data from the db, modify the Login.jsx file.
 */

import React, { useContext } from 'react'
import UserContext from '../context'
import '../styles/Driver.css'
import { Button } from '@mui/material';
import Map from './Map';


function Driver() {
  const { user } = useContext(UserContext);
  console.log('User in Driver component:', user);

  // without this check, the pages loads before the user is set in context
  if (!user) {
    return <h2 className='driver-redirect'>Please Login As A Driver!</h2>;
  }

  const isDriver = user.isDriver;

  const driverDashboard = (

    <div className='driver-dashboard'>

      <div className='driver-map'>

          <Map />
      </div>

      <div className='order-info'>

        <p> Dliver By: 8:50 </p>

        <p> Restaurant Name </p>

        <p> number of Items </p>

      </div>

      <div className='order-accept'>

        <p> $20.56 </p>

        <button className='driver-button'> Accept </button>


      </div>

    </div>
  )



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
  