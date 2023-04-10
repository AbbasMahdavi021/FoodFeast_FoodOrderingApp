import { useState, useEffect } from 'react';
import axios from "axios";
import Fuse from 'fuse.js';
import { Link } from 'react-router-dom';

import Filter from './Filter';

const Browse = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [searchRestaurants, setSearchRestaurants] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('All');
    const [cuisines, setCuisines] = useState([]);

    useEffect(() => {
        const getRestaurants = async () => {
            try {
                const response = await axios.get('/restaurants/getAllRestaurants');
                let rows = response.data;
                if (rows.length > 0) {
                    setRestaurants([...rows]);
                    setAllRestaurants([...rows]);

                    // Create an array of unique cuisines
                    const uniqueCuisines = [...new Set(rows.map(restaurant => restaurant.cuisine))];
                    // Create an array of objects containing the cuisine name
                    const cuisinesArray = uniqueCuisines.map(cuisine => ({ name: cuisine }));
                    setCuisines(cuisinesArray);
                } else {
                    console.log("No Restaurants to Show!");
                }
            } catch (err) {
                console.error(err);
            }
        };
        getRestaurants();
    }, []);

    const handleFilterChange = (cuisines) => {
        const checkedCuisines = cuisines.filter((cuisine) => cuisine.isChecked).map((cuisine) => cuisine.name);
        const filteredRestaurants = checkedCuisines.length === 0 ? [...allRestaurants] : allRestaurants.filter((restaurant) => checkedCuisines.includes(restaurant.cuisine));
        setRestaurants(filteredRestaurants);
        setSelectedCuisine(checkedCuisines.length === 1 ? checkedCuisines[0] : 'All');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = searchRestaurants.trim();
        const selectedCuisineFilter = selectedCuisine === 'All' ? () => true : (restaurant) => restaurant.cuisine === selectedCuisine;
        if (!searchTerm) {
            setRestaurants(allRestaurants.filter(selectedCuisineFilter));
            return;
        }
        const fuseOptions = {
            keys: ['name', 'cuisine', 'description'],
            threshold: 0.25,
        };
        const fuse = new Fuse(allRestaurants.filter(selectedCuisineFilter), fuseOptions);
        const searchResults = fuse.search(searchTerm);
        const searchedRestaurants = searchResults.map((result) => result.item);
        setRestaurants(searchedRestaurants);
    };

    return (
        <div className='browse-div'>
            <div className='filter-div'>
                <Filter cuisines={cuisines} handleFilterChange={handleFilterChange} />
                <form onSubmit={handleSearch}>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for Restaurant or Cuisine..." value={searchRestaurants} onChange={(e) => setSearchRestaurants(e.target.value)} />
                        <button type="submit">
                            <img src={process.env.PUBLIC_URL + '/images/brand/search.png'} alt="Search" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="restaurant-container">
                {restaurants.map((restaurant) => {
                    return (
                        <Link key={restaurant.id} to={`${restaurant.name.replace(/\s/g, '')}/${restaurant.id}`}>
                            <div className="restaurant-box">
                                <img src={restaurant.picture} alt={restaurant.name} />
                                <div className="restaurant-details">
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.price}</p>
                                    <p>{restaurant.cuisine}</p>
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
                                    <p>{restaurant.address}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Browse;