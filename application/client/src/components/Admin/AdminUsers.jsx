import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AdminUser from './AdminUser';


const AdminUsers = () => {


    const [userList, setUserList] = useState([]);

    useEffect( () => {


        const getUserList = async() => {

            const res = await axios.get('/admin/getUserList', {withCredentials: true});

            //Figure Out how to disect res and put it in userList
            console.log(res.data);

            setUserList(res.data);
    
        }; getUserList();

    }, [] ); 


    return(

        <div>
            {userList.map (user => <AdminUser name={user.username} userId={user.id} key={user.id} /> ) } 
        </div>
    )

};

export default AdminUsers;