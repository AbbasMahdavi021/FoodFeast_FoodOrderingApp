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
import Container from '@mui/material/Container';

import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const CartCheckout = ({ handleSubmit, formData, handleChange, handleNextClick, err, }) => {
    return (

        <Container component="main" width="700px">

            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 10,
                        mx: 10,
                        display: 'relative',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '700px',
                    }}
                >

                    <Typography component="h1" variant="h5" fontSize={38} align='center' paddingTop='20px' >
                        Checkout
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                        <Grid container spacing={6} >

                            <Typography variant="h5" align='left' fontSize={16} marginLeft={"2rem"} paddingTop='100px' >
                                Please provide your building name (e.g. HSS) & Room Number (e.g. 356)
                            </Typography>

                            <Grid item xs={12} sm={6} marginTop={'-6rem'}>
                                <TextField
                                    value={formData.building}
                                    onChange={e => handleChange(e)}
                                    required
                                    id="building"
                                    name="building"
                                    label="Building"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '3rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '4rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} marginTop={'-6rem'}>
                                <TextField
                                    value={formData.room}
                                    onChange={e => handleChange(e)}
                                    required
                                    id="room"
                                    name="room"
                                    label="Room"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    InputLabelProps={{
                                        sx: {
                                            fontSize: '3rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            fontSize: '4rem'
                                        }
                                    }}
                                    sx={{ mt: 2 }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    value={formData.specialInstructions}
                                    onChange={e => handleChange(e)}
                                    autoComplete="given-name"
                                    name="specialInstructions"
                                    required
                                    multiline
                                    fullWidth
                                    id="specialInstructions"
                                    label="Special Instructions"
                                    variant="standard"
                                    InputLabelProps={{
                                        sx: {

                                            fontSize: '2rem'
                                        }
                                    }}
                                    inputProps={{
                                        style: {
                                            height: "50px",
                                            fontSize: '2rem',
                                            paddingTop: '1rem',
                                        }
                                    }}
                                />
                            </Grid>

                            <Typography variant="h5" align='left' marginLeft={"3rem"} fontSize={16} paddingTop='50px' >
                                Please select your payment method type!
                            </Typography>

                            <Grid item xs={12} marginTop={'-3rem'}>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth >
                                        <InputLabel sx={{ fontSize: '1.7rem' }}
                                        > Payment Method</InputLabel>
                                        <Select
                                            value={formData.paymentMethod}
                                            onChange={e => handleChange(e)}
                                            name="paymentMethod"
                                            required
                                            fullWidth
                                            variant="standard"
                                            //font size for input prop
                                            sx={{ fontSize: '2rem' }}
                                        >
                                            <MenuItem value="Payment via Student ID" sx={{ fontSize: '1.7rem' }} >
                                                Payment via Student ID
                                            </MenuItem>
                                            <MenuItem value="Cash on Delivery" sx={{ fontSize: '1.7rem' }} >
                                                Cash on Delivery
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>

                        </Grid>


                        <div className="checkout-button" style={{ margin: '5rem' }}>
                            <button onClick={handleNextClick}>Next</button>
                        </div>

                        {err && (
                            <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
                                {err}
                            </p>
                        )}
                    </Box>
                </Box>
            </Grid>
        </Container>

    );
}


export default CartCheckout;
