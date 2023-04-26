/*

Admin dashboard related

By; Abbas M.

*/

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminUser from './AdminUser';


const AdminUsers = () => {


    const [userList, setUserList] = useState([]);
    const [refresh, setRefresh] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {

        const getUserList = async () => {


            const res = await axios.get('/admin/getUserList', { withCredentials: true });

            //Figure Out how to disect res and put it in userList
            console.log(res.data);

            setUserList(res.data);

        }; getUserList();

    }, [refresh]);

    const handleChange = (e) => {

        setSearchTerm(e.target.value);
        console.log(searchTerm);
    };

    const handleSearch = async () => {

        const res = await axios.post("/admin/getUser", { searchTerm: searchTerm }, { withCredentials: true });
        setUserList(res.data);
    };

    return (

        <div className='admin-users'>
            <div className='TL-header'>
                <h1 className='Header'> User List </h1>
                <div className='search-bar'>
                    <input className='search-input' type='text' placeholder='search user...' value={searchTerm} onChange={e => handleChange(e)} />
                    <button onClick={handleSearch}>
                        <img src={process.env.PUBLIC_URL + '/images/brand/search.png'} alt="Search" />
                    </button>
                </div>
            </div>

            {userList.map((user, index) =>
                <AdminUser
                    isOdd={index % 2 === 0 ? "even" : "odd"}
                    name={user.username}
                    userId={user.id}
                    key={user.id}
                    refresh={setRefresh}
                />
            )}
        </div>
    )

};

export default AdminUsers;