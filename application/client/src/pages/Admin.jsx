/*

Admin dashboard related

By; Abbas M.

*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/Admin/AdminLayout';

const Admin = () => {
  const [isAdminLoggedIn, setIsAdminLoggedin] = useState(false);

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
        <div>You must be logged in as an admin to access this page</div>
      )}
    </>
  );
};

export default Admin;
