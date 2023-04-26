/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: ThankYouForEnrolling.jsx
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: thank the restaurant owner for enrolling their restaurant
 *    let them know that they will be notified when their restaurant is approved
 *    should be within 1-2 business days
 * 
 */

import styles from '../styles/ThankYouForEnrolling.css';

function ThankYouForEnrolling() {
  return (


    <div className="thank-you-for-enrolling"

      style={{
        background: `url(${process.env.PUBLIC_URL}/images/brand/bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '89vh',
        width: '100vw',
      }}
    >
      <div className='thank-you-enroll'>
        <h1>Thank you for enrolling your restaurant!</h1>
        <h1>You will be notified when your restaurant is approved.</h1>
        <h1>This should be within 1-2 business days.</h1>
      </div>

    </div>
  );
}

export default ThankYouForEnrolling;
