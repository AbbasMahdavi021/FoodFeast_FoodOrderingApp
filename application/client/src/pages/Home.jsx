import { useState, useEffect } from 'react';
import axios from "axios";

const Home = () => {
    
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants/getAllRestaurants');
                let rows = response.data;
                console.log(rows);
                if(rows.length > 0) {
                    setRestaurants([...rows]);
                }else{
                    console.log("No Restaurants to Show!");
                }   
            } catch (err) {
                console.error(err);
            }
        };
        getRestaurants();
        console.log(restaurants);
    }, []);

    return (
        <div>
            {restaurants.map((restaurant) => {
                return(
                <div key={restaurant.id}>
                    <h2>{restaurant.name}</h2>
                    <p>{restaurant.description}</p>
                    <p>{restaurant.rating}</p>
                    <p>{restaurant.cuisine}</p>
                    <p>{restaurant.est_delivery_time}</p>
                    <img src={restaurant.picture} alt={restaurant.name} />
                </div>
            )})}
        </div>
    );
};

export default Home;