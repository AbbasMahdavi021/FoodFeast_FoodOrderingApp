/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: RegisterForm.jsx
 * Created on: 03/23
 * Author(s): Abbas M
 * Contact:  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: A child component that acts as register form, that gets rendered and props passed into,
 *      to create a good looking signup form. Use for user and driver register pages.
 */


import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const RegisterForm = ({ handleSubmit, formData, handleChange, setFormData, err, title }) => {
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
                        <Typography component="h1" variant="h5" fontSize={40} align="center" marginBottom={3} marginTop={5}>
                            {title}
                        </Typography>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
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
                                                fontSize: '1.2rem'
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
                                                fontSize: '1.2rem'
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
                                                fontSize: '1.2rem'
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
                                        value={formData.confirmPassword}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
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
                                    />
                                </Grid>
                            </Grid>

                            {title === "Sign Up as a Driver" &&

                                <Grid item marginRight={1} marginTop={2}>
                                    <label>
                                        <input
                                            checked={formData.checkboxDriver}
                                            onChange={(e) =>
                                                setFormData({ ...formData, checkboxDriver: e.target.checked })
                                            }
                                            type="checkbox"
                                            required
                                            style={{ transform: "scale(1.5)", marginRight: "8px" }}
                                        />
                                        <Link sx={{ color: 'black', fontSize: '2.2rem', cursor: 'pointer' }}>I have a valid Drivers License </Link>
                                    </label>
                                    
                                </Grid>

                            }

                            <Grid item marginRight={1} marginTop={2}>
                                <label>
                                    <input
                                        checked={formData.checkbox}
                                        onChange={(e) =>
                                            setFormData({ ...formData, checkbox: e.target.checked })
                                        }
                                        type="checkbox"
                                        required
                                        style={{ transform: "scale(1.5)", marginRight: "8px" }}
                                    />
                                    <Link sx={{ color: 'black', fontSize: '2.2rem', cursor: 'pointer' }}>I accept the Terms & Conditions </Link>
                                </label>
                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 3, mb: 2, borderRadius: '15px', fontSize: 20,
                                    backgroundColor: '#fc3', color: '#000000',
                                    width: '250px',
                                    '&:hover': { backgroundColor: '#FFCF01' },
                                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 10)',
                                    display: 'block',
                                    margin: '50px auto 50px',
                                }}
                            >
                                Sign Up
                            </Button>

                            <Grid container justifyContent="center">
                                <Grid item>
                                    <Link href="/login" variant="body2" sx={{ fontSize: 20, color: 'black' }}>
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


export default RegisterForm;
