/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: RegisterForm.jsx
 * Created on: 03/23
 * Author(s): Megan L, Abbas M
 * Contact: mlew1@mail.sfsu.edu,  amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: contains the styling and input fields for RestaurantRegister.jsx
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const RegisterForm = ({ handleSubmit, formData, handleChange, setFormData, err, title }) => {

    const [cuisineList, setCuisineList] = useState([]);

    useEffect(() => {

        const getCuisines = async () => {
            try {
                const response = await axios.get('/restaurants/getAllCuisines');
                let rows = response.data;
                console.log(rows)
                if (rows.length > 0) {
                    setCuisineList([...rows]);
                } else {
                    console.log("No Restaurants to Show!");
                }
            } catch (err) {
                console.error(err);
            }
        };
        getCuisines();
    }, []);


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
                        <Typography component="h1" variant="h5" fontSize={40} align="center" marginBottom={10} marginTop={10}>
                            {title}
                        </Typography>
                        {/* Username */}
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
                                {/* Email address */}
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
                                {/* password */}
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
                                {/* restaurant name */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.name}
                                        onChange={e => handleChange(e)}
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Restaurant Name"
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
                                {/* restaurant phone number */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.phone}
                                        onChange={e => handleChange(e)}
                                        type="number"
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Restaurant Phone Number"
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
                                {/* restaurant address */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.address}
                                        onChange={e => handleChange(e)}
                                        autoComplete="given-name"
                                        name="address"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Restaurant Address"
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

                                {/* cuisine drop down menu */}
                                <Grid item xs={12}>
                                    <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth >
                                            <InputLabel sx={{ fontSize: '1.7rem' }}
                                            > Select Category </InputLabel>
                                            <Select
                                                value={formData.cuisine}
                                                onChange={e => handleChange(e)}
                                                name="cuisine"
                                                required
                                                fullWidth
                                                //font size for input prop
                                                sx={{ fontSize: '2rem' }}
                                            >
                                                {cuisineList.map((cuisine) => (
                                                    <MenuItem
                                                        key={cuisine.id}
                                                        value={cuisine.id}
                                                        sx={{ fontSize: '1.7rem' }}
                                                    >
                                                        {cuisine.cuisine_name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {/* price range */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.price}
                                        onChange={e => handleChange(e)}
                                        name="price"
                                        required
                                        fullWidth
                                        id="price"
                                        label="Price Range ($ - $$$$$)"
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
                                {/* yelp rating */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.rating}
                                        onChange={e => handleChange(e)}
                                        name="rating"
                                        required
                                        fullWidth
                                        id="rating"
                                        label="Current Yelp Star Rating (1-5)"
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

                                {/* delivery time */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.est_delivery_time}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        id="est_delivery_time"
                                        label="Wait Time in Mins (e.g. 20)"
                                        name="est_delivery_time"
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
                                {/* store hours */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.hours}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        id="hours"
                                        label="Store Hours (e.g. 9am-7pm)"
                                        name="hours"
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

                                {/* add images */}
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.picture}
                                        onChange={e => handleChange(e)}
                                        required
                                        fullWidth
                                        id="picture"
                                        label="Store Image URL"
                                        name="picture"
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

                                {/* description box */}
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            width: 500,
                                            maxWidth: '100%',
                                        }}
                                    >
                                        <TextField
                                            value={formData.description}
                                            onChange={e => handleChange(e)}
                                            autoComplete="given-name"
                                            name="description"
                                            required
                                            multiline
                                            fullWidth
                                            id="description"
                                            label="Description"
                                            InputLabelProps={{
                                                sx: {
                                                    fontSize: '1.7rem'
                                                }
                                            }}
                                            inputProps={{
                                                style: {
                                                    height: "100px",
                                                    fontSize: '1.5rem'
                                                }
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            {/* checkbox */}
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
