/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: AddedItem.jsx
 * Created on: 04/23
 * Author(s):
 * Contact: 
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: React functional component that displays a confirmation message after an item 
 *      has been added to the menu. It provides buttons to add a new item or return to the dashboard, 
 *      and uses Material-UI components and custom CSS for styling.
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
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import UploadFileIcon from "@mui/icons-material/UploadFile";

import '../styles/MenuEntry.css';


function AddedItem() {

 
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
                backgroundImage: 'url(https://img.rawpixel.com/private/static/images/website/2022-05/px1369813-image-kwvxxp91.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=b0bb6d55ae739cf84787c39dfe80d0ba)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '89vh',
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
                                height: '400px',
                            }}
                        >

                            <Typography component="h1" variant="h5" fontSize={38} align='center'paddingTop='20px' >
                                Item added to Menu
                            </Typography>

                                <Button
                                    href="/menuentry"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20, backgroundColor:"purple" }}
                                >
                                    Add new item
                                </Button>
                                <Button
                                    href="/#"
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 15, backgroundColor:"purple" }}
                                >
                                    Return to Dashboard
                                </Button>
                                
  
                        </Box>
                    </Grid>
                </Container>



            </div>
        </div>
    );
}

export default AddedItem;