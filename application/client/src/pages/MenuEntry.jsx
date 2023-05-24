/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: MenuEntry.jsx
 * Created on: 03/23
 * Author(s): Megan L.
 * Contact: mlew1@mail.sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: React functional component that allows users to add a new menu item for a restaurant. 
 *      The component renders a form to collect item name, price, description, and image URL. 
 *      It uses Material-UI components for layout and styling. 
 * 
 *      The form data is stored in the local state and submitted to the '/addMenuItem' endpoint 
 *      using an axios POST request. Upon successful submission, the user is redirected to the 
 *      '/addeditem/:restaurantId' page. 
 */
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import '../styles/MenuEntry.css';

function MenuEntry() {

    const navigate = useNavigate();

    const { restaurantId } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        price: null,
        description: "",
        image: "",
        restaurant_id: restaurantId,
    });

    const handleChange = (e) => {
        let obj = {
            ...formData
        }

        obj[e.target.name] = e.target.value;
        setFormData(obj);

    };

    const handleReturn = () => {

        navigate("/restaurantDashboard");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name) {
            setErr("Item Name field is required");
            return;
        }

        if (!formData.price) {
            setErr("Price field is required");
            return;
        }

        const pricePattern = /^\d+(\.\d{2})?$/;
        if (!pricePattern.test(formData.price)) {
            setErr("Invalid price format!");
            return;
        }

        if (!formData.description) {
            setErr("Description field is required ");
            return;
        }

        if (!formData.image) {
            setErr("Image URL field is required ");
            return;
        }

        console.log(formData.name);

        try {

            const res = await axios.post('/menu/addMenuItem', formData);

            setFormData({
                name: "",
                price: NaN,
                description: "",
                image: "",
                restaurant_id: restaurantId,
            });

            setErr("Item Added Successfully!")

        } catch (err) {
            setErr("Could not add Item! Please Try Again Later!")
            console.log(err);
            console.log("ERROR HERE!")
        }
    };

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
        <div className='menu-div'
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/brand/menuentry.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '88vh',
                width: '100vw',
            }}
        >

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
                                height: '750px',
                            }}
                        >

                            <Typography component="h1" variant="h5" fontSize={38} align='center' paddingTop='20px' >
                                Menu Entry
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                                <TextField
                                    value={formData.name}
                                    onChange={e => handleChange(e)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Item Name"
                                    autoFocus
                                    variant='filled'
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '2.4rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />

                                <TextField
                                    value={formData.price}
                                    onChange={e => handleChange(e)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
                                    variant='filled'
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '2.4rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />

                                <TextField
                                    value={formData.description}
                                    onChange={e => handleChange(e)}
                                    autoComplete="given-name"
                                    name="description"
                                    required
                                    multiline
                                    fullWidth
                                    id="description"
                                    variant='filled'
                                    label="Description"
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '2rem',
                   
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            height: "100px",
                                            fontSize: '2rem',
                                            paddingTop: '1rem'
                                        }
                                    }}
                                />

                                <TextField
                                    value={formData.image}
                                    onChange={e => handleChange(e)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="image"
                                    label="Item Image URL"
                                    variant='filled'
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '2.2rem',
                                            marginBottom: '1rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />

                                {/* <Button
                                     startIcon={<UploadFileIcon />}
                                     variant="outlined"
                                     color="primary"
                                     onClick={() => fileInput.current.click()}
                                     sx={{ width: "238px", marginTop: "10px", color: "purple" }}>
                                     upload images
                                 </Button> */}

                                {/* <input
                                     ref={fileInput}
                                     type="file"
                                     style={{ display: 'none' }} /> */}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20, backgroundColor: "purple", '&:hover': { backgroundColor: 'purple' } }}
                                >
                                    Add Item
                                </Button>

                                <Button
                                    onClick={handleReturn}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20, backgroundColor: "purple", '&:hover': { backgroundColor: 'purple' } }}
                                >
                                    Finish & Return
                                </Button>


                                {err !== 'Item Added Successfully!' && (
                                    <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
                                        {err}
                                    </p>
                                )}

                                {err === 'Item Added Successfully!' && (
                                    <p style={{ fontSize: "25px", color: "green", textAlign: "center", fontWeight: "bold" }}>
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

export default MenuEntry;