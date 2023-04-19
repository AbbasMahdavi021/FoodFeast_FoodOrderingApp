// form for restaurant owner to enroll their restaurant

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EnrollRestaurant.css';

const EnrollRestaurant = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [description, setDescription] = useState('');
    const [est_delivery_time, setEstDeliveryTime] = useState('');
    const [address, setAddress] = useState('');
    const [picture, setPicture] = useState('');
    const [phone, setPhone] = useState('');
    const [hours, setHours] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/enroll', {
                name,
                cuisine,
                description,
                est_delivery_time,
                address,
                picture,
                phone,
                hours,
            });
            console.log('your restaurant id: ', response.data.restaurant_id);
            navigate(`/addMenuItems/${response.data.restaurant_id}`);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='enroll-restaurant'>
            <h1>Enroll Restaurant</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Restaurant Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='cuisine'>Cuisine</label>
                    <input
                        type='text'
                        id='cuisine'
                        name='cuisine'
                        value={cuisine}
                        onChange={(e) => setCuisine(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='est_delivery_time'>Estimated Delivery Time</label>
                    <input
                        type='text'
                        id='est_delivery_time'
                        name='est_delivery_time'
                        value={est_delivery_time}
                        onChange={(e) => setEstDeliveryTime(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='hours'>Hours</label>
                    <input
                        type='text'
                        id='hours'
                        name='hours'
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='phone'>Phone</label>
                    <input
                        type='text'
                        id='phone'
                        name='phone'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='image'>Image</label>
                    <input
                        type='text'
                        id='image'
                        name='picture'
                        value={picture}
                        onChange={(e) => setPicture(e.target.value)}
                    />
                </div>
                <button type='submit'>Enroll</button>
            </form>
        </div>
    );
}

export default EnrollRestaurant;