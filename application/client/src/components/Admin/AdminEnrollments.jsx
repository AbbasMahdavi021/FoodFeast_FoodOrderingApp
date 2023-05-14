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
import React, {useEffect, useState} from 'react';
import AdminUser from './AdminUser';


const AdminEntrollment = () => {


    const [userList, setUserList] = useState([]);

    const [refresh, setRefresh] = useState(1);

    useEffect( () => {

        const getUserList = async() => {
            

            const res = await axios.get('/admin/getUserList', {withCredentials: true});

            //Figure Out how to disect res and put it in userList
            console.log(res.data);

            setUserList(res.data);
    
        }; getUserList();

    }, [refresh] ); 


    return(

        <div className='admin-users'>
            <h1 className='Header'> Entroll List </h1>

        </div>
    )

};

export default AdminEntrollment;