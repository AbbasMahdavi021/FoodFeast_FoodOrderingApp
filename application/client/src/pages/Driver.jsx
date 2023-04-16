/*
 *   Conditionally renders the driver name if the user is a driver 
 *   or a link to register as a driver if the user is not a driver.
 *   Other driver and user data can be retrieved this way as well. 
 *   To fetch additional data from the db, modify the Login.jsx file.
 */

import React, { useContext } from 'react'
import UserContext from '../userContext'
import '../styles/Driver.css'

function Driver() {
    const { user } = useContext(UserContext);
    console.log('User in Driver component:', user);
 
    // without this check, the pages loads before the user is set in context
    if (!user) {
      return <h2>Loading...</h2>;
    }

    const isDriver = user.isDriver;
    

    return (
      <div className='driverName'> 
        {isDriver ? (
            <p>Driver: {user.username} </p>
        ) : (
            <p>This user is not a Driver: --Insert link to driver registration here--</p>
        )}
        </div>


    );
  }
  
  export default Driver;
  