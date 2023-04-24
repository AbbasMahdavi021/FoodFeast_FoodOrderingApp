// this file is for restuarant owners to register for the site
// the styling and input fields are in RestaurantRegisterForm.jsx

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import RegisterForm from '../components/RestaurantRegisterForm';

export default function Register() {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        name: "",
        phone: "",
        address: "",
        cuisine: "",
        price: "",
        rating: null,
        est_delivery_time: null,
        hours: "",
        picture: "",
        description: "",
        checkbox: false,
    });

    const handleChange = (e) => {
        let obj = {
            ...formData
        }

        obj[e.target.name] = e.target.value;
        setFormData(obj);
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username) {
            setErr("Username field is required");
            return;
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
        if (!emailRegex.test(formData.email)) {
            setErr("Please enter a valid email address");
            return;
        }
        
        if (!formData.password) {
            setErr("Password field is required");
            return;
        }

        // Validate password format
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
        if (!passwordRegex.test(formData.password)) {
            setErr("Password must contain: one lowercase letter, one uppercase letter, one number, and 5 characters long!");
            return;
        }

        if (!formData.name) {
            setErr("Restaurant Name field is required");
            return;
        }
        
        if (!formData.phone) {
            setErr("Restaurant Phone field is required");
            return;
        }

        if (!formData.address) {
            setErr("Restaurant Address field is required ");
            return;
        }

        if (!formData.cuisine) {
            setErr("Cuisine field is required ");
            return;
        }

        if (!formData.price) {
            setErr("Price Range field is required ");
            return;
        }

        if (!formData.rating) {
            setErr("Rating field is required!");
            return;
        }
        if (!formData.est_delivery_time) {
            setErr("Estimated Delivery Time field is required ");
            return;
        }
        if (!formData.hours) {
            setErr("Restaurant Hours field is required ");
            return;
        }
        if (!formData.picture) {
            setErr("Restaurant Image field is required ");
            return;
        }

        if (!formData.description) {
            setErr("Description field is required ");
            return;
        }

        if (!formData.checkbox) {
            setErr("Please accept the Terms & Conditions");
            return;
        }

        
        try {
            const res = await axios.post("/auth/restaurantOwnerRegister", formData);
            const owner_id = res.data.owner_id;
            const result = await axios.post("/enroll", {...formData, owner_id: owner_id});
            navigate("/thankyouforenrolling");
        } catch (err) {
            setErr(err.response.data);
        }
    };


    //error display

    const [err, setErr] = useState(null);

    useEffect(() => {
        if (err) {
            const timerId = setTimeout(() => {
                setErr(null);
            }, 3000);
            return () => clearTimeout(timerId);
        }
    }, [err]);

    return (
        <>
            <RegisterForm
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                err={err}
                title="Register Restaurant"
            />
        </>
    );
}