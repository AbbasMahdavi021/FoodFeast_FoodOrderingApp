/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: AdminLogin.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Admin Login Page, simple make a request to /admin/login, 
 *      check db, and log in if info is correct
 */

import React, { useState, useEffect } from 'react';
import axios from "axios";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


import '../styles/Admin.css';


function AdminLogin() {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        let obj = {
            ...formData
        }

        obj[e.target.name] = e.target.value;
        setFormData(obj);

    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.username) {
            setErr('Username field is required')
            return
        }

        if (!formData.password) {
            setErr('Password field is required')
            return
        }

        try {
            const res = await axios.post("/auth/adminlogin", formData);
            if (res.data.success) {
                window.location.href = '/admin';
            }

        } catch (err) {
            console.error('Error:', err)
            setErr(
              err.response ? err.response.data : 'An error occurred during login.',
            )
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            const gif = document.querySelector('.matrix-gif');
            gif.style.display = 'none';
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    //error display

    const [err, setErr] = useState(null)

    useEffect(() => {
        if (err) {
            const timerId = setTimeout(() => {
                setErr(null)
            }, 3000)
            return () => clearTimeout(timerId)
        }
    }, [err])




    return (
        <div className='admin-div'
            style={{
                backgroundImage: 'url(https://cdn.wallpapersafari.com/89/15/0lQbAz.gif)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '89vh',
                width: '100vw',
            }}
        >

            <img
                className='matrix-gif'
                src='https://cdn.wallpapersafari.com/89/15/0lQbAz.gif'
                alt='Matrix Binary Glitch'
            />

            <div className='form-container'>

                <Container component="main" maxWidth="xs">

                    <Grid item xs={25} sm={16} md={20} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 10,
                                mx: 10,
                                display: 'relative',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5" fontSize={38} align='center' color='red' >
                                Admin Sign in
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                                <TextField
                                    value={formData.name}
                                    onChange={e => handleChange(e)}
                                    autoComplete="given-name"
                                    name="username"
                                    label="Username"
                                    required
                                    fullWidth
                                    autoFocus
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '2rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />
                                <TextField
                                    value={formData.name}
                                    onChange={e => handleChange(e)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '1.2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '2rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20 }}
                                >
                                    Sign In
                                </Button>


                                {err && (
                                    <p
                                        style={{ fontSize: '20px', color: 'red', textAlign: 'center', marginTop: '25px', marginBottom: '25px' }}
                                    >
                                        {err}
                                    </p>
                                )}

                            </Box>
                        </Box>
                    </Grid>
                </Container>



            </div>
        </div>
    );
}

export default AdminLogin;


