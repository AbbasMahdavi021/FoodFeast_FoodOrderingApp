import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RestaurantsContext } from './RestaurantsContext';

const RestaurantList = () => {

  const { restaurants } = useContext(RestaurantsContext);

  return (

    <div className='restaurant-list-div'>
      <div className="restaurant-container">
        {restaurants.map((restaurant) => {
          return (
            <Link key={restaurant.id} to={`${restaurant.name.replace(/\s/g, '')}/${restaurant.id}`}>
              <div className="restaurant-box">
                <img src={restaurant.picture} alt={restaurant.name} />
                <div className="restaurant-details">
                  <h2>{restaurant.name}</h2>
                  <p>{restaurant.price}</p>
                  <p>{restaurant.cuisine_name}</p>
                  <h1>{restaurant.description}</h1>
                  <p>
                    {[...Array(5)].map((star, i) => {
                      if (i < restaurant.rating) {
                        return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star1.png'} alt="star" />;
                      } else {
                        return <img key={i} src={process.env.PUBLIC_URL + '/images/brand/star2.png'} alt="star" />;
                      }
                    })}
                  </p>
                  <p>{restaurant.est_delivery_time - 5}-{restaurant.est_delivery_time} mins</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>

  );
};

export default RestaurantList;
