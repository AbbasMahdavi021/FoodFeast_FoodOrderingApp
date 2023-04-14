import axios from 'axios';
import React, {useEffect, useState} from 'react';
import AdminUser from './AdminUser';


const AdminUsers = () => {


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
            <h1 className='Header'> User List </h1>
            {userList.map ((user, index) => 
                <AdminUser 
                    isOdd={index %2 == 0 ? "even": "odd"}  
                    name={user.username} 
                    userId={user.id} 
                    key={user.id} 
                    refresh={setRefresh}
                /> 
                ) } 
        </div>
    )

};

export default AdminUsers;