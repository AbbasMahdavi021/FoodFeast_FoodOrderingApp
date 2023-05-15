/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Admin.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: React functional component that checks if the user is logged 
 *    in as an administrator and conditionally renders the Admin Dashboard using 
 *    'AdminLayout' component. If the user is not an admin, it displays an access 
 *    restriction message. 
 */


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminLayout from '../components/Admin/AdminLayout';

const Admin = () => {
  const [isAdminLoggedIn, setIsAdminLoggedin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get('/auth/getStatus', { withCredentials: true });
        setIsAdminLoggedin(res.data.isAdminLoggedIn);
      } catch (err) {
        console.error(err);
      }
    };
    getStatus();
  }, []);

  return (
    <>
      {isAdminLoggedIn ? (
        <div>
          <div className='admin-div'>
            <h1>Welcome to the Admin Dashboard</h1>
          </div>

          <AdminLayout />

        </div>

      ) : (
        <div className='admin-div'>
          <h1>You must be logged in as an admin to access this page</h1>
          <a href='/adminlogin' className='tab-button'>
            Admin Login
          </a>
        </div>
      )}
    </>
  );
};

export default Admin;
