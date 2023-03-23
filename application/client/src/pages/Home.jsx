import { useState, useEffect } from 'react';
import axios from "axios";
import Filter from './Filter';

const Home = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants/getAllRestaurants');
                let rows = response.data;
                if (rows.length > 0) {
                    setRestaurants([...rows]);
                    setAllRestaurants([...rows]);
                    console.log(allRestaurants);
                } else {
                    console.log("No Restaurants to Show!");
                }
            } catch (err) {
                console.error(err);
            }
        };
        getRestaurants();
    }, []);

    const handleFilterChange =  (cuisines) => {
        let checkedCuisines = [];
        
        for (let i=0; i < cuisines.length; i ++) {
            if (cuisines[i].isChecked) {
                checkedCuisines.push(cuisines[i].name);
            }
        }

        let filteredRestaurants = [];

        for (let i = 0; i < allRestaurants.length; i++){
            if(checkedCuisines.includes(allRestaurants[i].cuisine)){
                console.log(allRestaurants[i]);
                filteredRestaurants.push(allRestaurants[i]);
            }
        }
        setRestaurants([...filteredRestaurants]);
    };

    return (
        <div>
            <Filter handleFilterChange={handleFilterChange}/>
            <div className="restaurant-container">
                {restaurants.map((restaurant) => {
                    return (
                        <div className="restaurant-box" key={restaurant.id}>
                            <img src={restaurant.picture} alt={restaurant.name} />
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.description}</p>
                            <p>Rating: {restaurant.rating}</p>
                            <p>Cuisine: {restaurant.cuisine}</p>
                            <p>Delivery Time: {restaurant.est_delivery_time}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Home;