import React from 'react';

const HomeHeader = ({ scrollToSecondPage }) => {

    return (

        <div className='home-header-div'>

            <div className='home-header'>
                <div className='text-container'>
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

            <div className='featured-restaurants'>
                Put featured restaurants box here!
            </div>

            <div className='featured-restaurants'>
                Put Favored restaurants box here!
            </div>

            <div className='browse-button'>
                <button onClick={scrollToSecondPage}>
                    Browser All Restaurants
                </button>
            </div>

        </div>

            //Featured restaurants will go Here.

            //Favorite restaurants will go here.



    );
}

export default HomeHeader;