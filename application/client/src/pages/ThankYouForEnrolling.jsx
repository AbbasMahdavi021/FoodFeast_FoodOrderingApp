/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: ThankYouForEnrolling.jsx
 * Created on: 04/23
 * Author(s): Jed G, Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: thank the restaurant owner for enrolling their restaurant
 *    let them know that they will be notified when their restaurant is approved
 *    should be within 1-2 business days
 * 
 */

import styles from '../styles/ThankYouForEnrolling.css';
import { useNavigate } from 'react-router-dom'

function ThankYouForEnrolling() {

  const navigate = useNavigate();

  return (

    <div className="thank-you-for-enrolling"

      style={{
        background: `url(${process.env.PUBLIC_URL}/images/brand/bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
      }}
    >
      <div className='thank-you-enroll'>
        <h1>Thank you for enrolling your restaurant!</h1>
        <h1>You will be notified when your restaurant is approved.</h1>
        <h1>This should be within 1-2 business days.</h1>
        <h1>You can also checkout your Restaurant's Dashboard too see if it's live.</h1>
        <h1>You will be prompted to login.</h1>

        <div className="checkout-button">
          <button style={{marginRight : '30%'}}onClick={() => navigate('/restaurantDashboard')}>Go to Restaurant Dashboard</button>
        </div>
      </div>



    </div>

  );
}

export default ThankYouForEnrolling;
