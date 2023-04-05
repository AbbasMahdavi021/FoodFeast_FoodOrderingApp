import React from 'react';
import '../styles/HomeHeader.css';

const HomeHeader = () => {

    return (

        <div className='home-header'>
            <div className='plate-container'>
                <h1>Meals made simple.</h1>
                <h1>Food delivered anywhere </h1>
                <h1>on campus.</h1>
                <h1>Exclusive use for SFSU </h1>
                <h1>Students, Staff, & Faculty.</h1>
            </div>
            <div className='food-plate'>
                <img src={process.env.PUBLIC_URL + '/images/brand/food-dish.png'} alt="Plate" />
            </div>
        </div>

        //Featured restaurants will go Here.

        //Favorite restaurants will go here.

    );
}

export default HomeHeader;