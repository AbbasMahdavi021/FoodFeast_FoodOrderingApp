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
        // Good job preventing the default form submission behavior.
        event.preventDefault(); 


        // It's great that you're trimming the input to remove any leading or trailing spaces.
        // However, the variable name searchRestaurants is a bit confusing, since it's actually the search term.
        const searchTerm = searchRestaurants.trim(); 

        // Nice use of ternary operator to handle the 'All' case. 
        // This is a clean and concise way to create the filter function.
        const selectedCuisineFilter = selectedCuisine === 'All' ? () => true : (restaurant) => 
            restaurant.cuisine_name === selectedCuisine;

        // Good job handling the case where the search term is empty. This is a good user experience decision.
        if (!searchTerm) {
            setRestaurants(allRestaurants.filter(selectedCuisineFilter));
            navigate('/browse');
            return;
        }

        // It's great that you're specifying multiple keys for Fuse.js to search. 
        // This will make the search more robust.
        // It might be helpful to add a comment explaining what the 'threshold' option does
        // for those unfamiliar with Fuse.js.
        const fuseOptions = {
            keys: ['name', 'cuisine', 'description'],
            threshold: 0.25,
        };
        
        // Good job reusing the 'selectedCuisineFilter' from earlier, as it prevents redundant code.
        const fuse = new Fuse(allRestaurants.filter(selectedCuisineFilter), fuseOptions);
    
        // Nice use of map to extract the actual restaurant objects from the search results.
        const searchResults = fuse.search(searchTerm);
        const searchedRestaurants = searchResults.map((result) => result.item);
        setRestaurants(searchedRestaurants);
        
        // Good job navigating the user to the browse page after the search. 
        // This is a good user experience decision.
        navigate('/browse');
    };
    

    return (
        <div className='browse-div'>
            <div className='filter-div'>
                <div className='filter'>
                    <Filter cuisines={cuisines} handleFilterChange={handleFilterChange} />
                    {/* Good job using a form for the search bar. This allows the user to submit the form by 
                    pressing Enter, which is a good user experience decision. */}
                    <form className='search-bar' onSubmit={handleSearch}>
                        {/* It's great that you're controlling the input value with state. 
                        This is a good React pattern.
                        Also, good job setting a maxLength for the input. 
                        This prevents the user from entering an excessively long search term. */}
                        <input  className='search-input' 
                                type="text" 
                                placeholder="Search for Restaurant or Cuisine..." 
                                value={searchRestaurants} 
                                onChange={(e) => setSearchRestaurants(e.target.value)}
                                maxLength={40}
                        />
    
                        <button type="submit" className='search-button'>
                            <PageviewIcon sx={{fontSize: 60}} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Browse;