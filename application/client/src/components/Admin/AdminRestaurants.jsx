/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Footer.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Admin Dashboard, and sql command line components (Side Project)
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminRestaurant from './AdminRestaurant';
import PageviewIcon from '@mui/icons-material/Pageview';



const AdminRestaurants = () => {


    const [restaurantList, setRestaurantList] = useState([]);
    const [refresh, setRefresh] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const getRestaurantList = async () => {

            const res = await axios.get('/admin/getAllRestaurants');

            setRestaurantList(res.data);

        }; getRestaurantList();

    }, [refresh]);


    const handleChange = (e) => {

        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    const handleSearch = async () => {

        const res = await axios.post("/admin/getRestaurants", { searchTerm: searchTerm }, { withCredentials: true });
        setRestaurantList(res.data);
    };




    return (

        <div className='admin-users'>
            <div className='TL-header'>
                <h1 className='Header'> Restaurant List </h1>
                <div className='search-bar'>
                    <input className='search-input' type='text' placeholder='search user...' value={searchTerm} onChange={e => handleChange(e)} />
                    <button onClick={handleSearch}>
                        <PageviewIcon sx={{ fontSize: 60 }} />
                    </button>
                </div>
            </div>

            {restaurantList.map((restaurant, index) =>
                <AdminRestaurant
                    isOdd={index % 2 === 0 ? "even" : "odd"}
                    name={restaurant.name}
                    restaurantId={restaurant.id}
                    key={restaurant.id}
                    refresh={setRefresh}
                />
            )}
        </div>
    )

};

export default AdminRestaurants;