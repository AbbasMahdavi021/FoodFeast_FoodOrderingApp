import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminRestaurant from './AdminRestaurant';


const AdminRestaurants = () => {


    const [restaurantList, setRestaurantList] = useState([]);

    const [refresh, setRefresh] = useState(1);

    useEffect(() => {

        const getRestaurantList = async () => {

            const res = await axios.get('/restaurants/getAllRestaurants');

            setRestaurantList(res.data);

        }; getRestaurantList();

    }, [refresh]);


    return (

        <div className='admin-users'>
            <h1 className='Header'> Restaurant List </h1>
            <div className='admin-list'>

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

        </div>
    )

};

export default AdminRestaurants;