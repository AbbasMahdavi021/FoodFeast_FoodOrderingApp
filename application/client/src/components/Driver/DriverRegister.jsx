import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from "axios";

import RegisterForm from '../RegisterForm';



export default function Register() {

    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
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

        if (!formData.email) {
            setErr("Email field is required");
            return;
        }

        // check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

        if (!formData.checkbox) {
            setErr("Please accept the Terms & Conditions");
            return;
        }

        try {
            await axios.post("/driver/register", formData);
            navigate("/login");
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
                title="Sign Up as a Driver"
            />
        </>
    );
}