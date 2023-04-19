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


function MenuEntry() {

    const [formData, setFormData] = useState({
        item: "",
        price: "",
        description: ""
    });

    const handleChange = (e) => {
        let obj = {
            ...formData
        }

        obj[e.target.name] = e.target.value;
        setFormData(obj);

    };

    const fileInput = React.useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.item) {
            setErr("Item field is required");
            return;
        }
        
        if (!formData.price) {
            setErr("Price field is required");
            return;
        }

        if (!formData.description) {
            setErr("Description field is required ");
            return;
        }

        try {
            const res = await axios.post("/auth/menuentry", formData);
            if (res.data.success) {
                window.location.href = '/menuentry';
            }

        } catch (err) {
            console.log(err);
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
                                height: '600px',
                            }}
                        >

                            <Typography component="h1" variant="h5" fontSize={38} align='center'paddingTop='20px' >
                                Menu Entry
                            </Typography>

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>

                                <TextField
                                    value={formData.name}
                                    onChange={e => handleChange(e)}
                                    autoComplete="given-name"
                                    name="item"
                                    label="Item"
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
                                    value={formData.price}
                                    onChange={e => handleChange(e)}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="price"
                                    label="Price"
                                    type="number"
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
                                  value={formData.description}
                                  onChange={e => handleChange(e)}
                                  autoComplete="given-name"
                                  name="description"
                                  required
                                  multiline
                                  fullWidth
                                  id="description"
                                  label="Description"                
                                   autoFocus
                                        InputLabelProps={{
                                            sx: {
                                                fontSize: '1.2rem'
                                            }
                                        }}
                                        inputProps={{
                                            style: {
                                                height: "100px",
                                                fontSize: '1.5rem'
                                            }
                                        }}
                                />   
                                                             
                                <Button 
                                startIcon={<UploadFileIcon />}
                                variant="outlined" 
                                color="primary" 
                                onClick={()=>fileInput.current.click()} 
                                sx={{ width:"238px", marginTop: "10px", color: "purple"}}>
                                upload images
                                 </Button>
                                 <input 
                                ref={fileInput} 
                                type="file" 
                                style={{ display: 'none' }}/>
              
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, fontSize: 20, backgroundColor:"purple" }}
                                >
                                    Submit
                                </Button>
                                
                                
                                {err && (
                                <p style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
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