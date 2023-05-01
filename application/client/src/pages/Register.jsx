/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Register.jsx
 * Created on: 04/17/2023
 * Author(s):Elahe Bashiri
 * Contact: Ebashiri@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This is the Register page for users,it contains the client side code for DOM manupulation, and API request
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";



const theme = createTheme();

export default function Register() {

    const [formData, setFormData] = useState({
        email: "",
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

        // check if email ends with @sfsu.edu
        const emailRegex = /^[\w-.]+@sfsu.edu$/i;
        if (!emailRegex.test(formData.email)) {
            setErr("Please enter a valid SFSU email address");
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

        try {
            const res = await axios.post("/auth/register", formData);
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
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '90vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/brand/banner.jpg)`, //TODO 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 10,
                            mx: 10,
                            display: 'relative',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5" fontSize={40} align='center' marginBottom={10}>
                            Sign up 
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        value={formData.username}
                                        onChange={e => handleChange(e)}
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '1.7rem',
                                            }
                                        }}
                                        inputProps={{
                                            style: {
                                                fontSize: '2rem',
                                                
                                            }
                                        }}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.email}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '1.7rem'
                                            }
                                        }}
                                        inputProps={{
                                            style: {
                                                fontSize: '2rem'
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.password}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '1.7rem'
                                            }
                                        }}
                                        inputProps={{
                                            style: {
                                                fontSize: '2rem'
                                            }
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.password}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        name="password"
                                        label="Confirm Password"
                                        type="Password"
                                        id="password"
                                        autoComplete="new-password"
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '1.7rem'
                                            }
                                        }}
                                        inputProps={{
                                            style: {
                                                fontSize: '2rem'
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item marginBottom={10} marginTop={1} marginLeft={1}>
                            <input type="checkbox"  style={{ transform: 'scale(1.5)', marginRight: '8px'}} />
                               <Link href="#" sx={{ color:'black' ,fontSize: '2.1rem'}}>I accept the terms & conditions</Link>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, borderRadius: '15px',fontSize: 20 , backgroundColor: '#fc3', color: '#000000' ,width: '250px', margintop: '50px', marginLeft: '170px',marginBottom:'70px' , '&:hover': {
                                    backgroundColor: '#fc3', 
                                  },  }}
                            >
                                Sign Up
                            </Button>

                            <Grid container  >
                                <Grid item >
                                    <Link href="/login" variant="body2" sx={{ fontSize: 20 , color:'black', marginLeft:'150px', }}>
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>

                            {err && (
                                <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
                                    {err}
                                </p>
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}