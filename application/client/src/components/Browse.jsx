/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Browse.jsx
 * Created on: 04/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Component that allows users to browse a list of restaurants.
 * 
 *      It shows you a list of restaurants from an api and lets you filter them by type of 
 *      food or search for a specific one.
 * 
 *      When you open the page, it looks up all the restaurants and saves them. It also 
 *      creates a list of food types to filter by, via a drop down.
 * 
 *      When you pick a food type to filter by, the list of restaurants gets updated to 
 *      only show the ones that match.
 * 
 *      When you search for a specific restaurant, it looks through the list of names and 
 *      types to find the match and shows you the results.
 */

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Fuse from 'fuse.js';
import PageviewIcon from '@mui/icons-material/Pageview';

import { RestaurantsContext } from './RestaurantsContext';
import Filter from './Filter';

const Browse = () => {

    const navigate = useNavigate();

    const { setRestaurants } = useContext(RestaurantsContext);

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
                    const uniqueCuisines = [...new Set(rows.map(restaurant => restaurant.cuisine_name))];
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
        const filteredRestaurants = checkedCuisines.length === 0 ? [...allRestaurants] : allRestaurants.filter((restaurant) => checkedCuisines.includes(restaurant.cuisine_name));
        setRestaurants(filteredRestaurants);
        setSelectedCuisine(checkedCuisines.length === 1 ? checkedCuisines[0] : 'All');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = searchRestaurants.trim();
        const selectedCuisineFilter = selectedCuisine === 'All' ? () => true : (restaurant) => restaurant.cuisine_name === selectedCuisine;
        if (!searchTerm) {
            setRestaurants(allRestaurants.filter(selectedCuisineFilter));
            navigate('/browse');
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
        navigate('/browse');
    };


    return (
        <div className='browse-div'>
            <div className='filter-div'>
                <div className='filter'>
                    <Filter cuisines={cuisines} handleFilterChange={handleFilterChange} />
                    <form className='search-bar' onSubmit={handleSearch}>
                        <input  className='search-input' 
                                type="text" 
                                placeholder="Search for Restaurant or Cuisine..." 
                                value={searchRestaurants} 
                                onChange={(e) => setSearchRestaurants(e.target.value)}
                                maxLength={40}
                        />

                        <button type="submit">
                            <PageviewIcon sx={{fontSize: 60}} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Browse;