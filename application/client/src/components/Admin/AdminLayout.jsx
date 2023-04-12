import React from 'react';
import '../..//styles/AdminLayout.css';
import AdminUsers from './AdminUsers'



const AdminTabs = () => {

    return (
        <div className='tabs'>

            <div >
                <div className='tab active'> Users </div>
                <div className='tab'> Restaurants </div>
                <div className='tab'> Entrollments </div>
            </div>

            <div className='tab-buttons'>
                <a href="/adminlogin" className="tab-button"> Logout</a>
                <a href="/" className="tab-button"> Exit </a>
            </div>

        </div>
    );

};


const CMD = () => {

    return (

        <div className='user-box'>
            C:\Users\abbas\OneDrive\Desktop\648\csc648-03-sp23-team01\application\server
        </div>
    );
};


const AdminSideBoxes = () => {

    return (

        <div className='side-boxes'>
            <div className='top-boxes'>
                <div className='top-box left'> 
                
                    <AdminUsers />
                    
                    </div>
                <div className='top-box right'> FAKE INFO BOX </div>
            </div>
            <CMD />

        </div>
    );
};


const AdminLayout = () => {

    return (

        <div className='admin-layout'>
            <div className='left-boxes'>
                <AdminTabs />

            </div>

            <div className='admin-side-boxes'>
                <AdminSideBoxes />
            </div>
        </div>
    );
};

export default AdminLayout;