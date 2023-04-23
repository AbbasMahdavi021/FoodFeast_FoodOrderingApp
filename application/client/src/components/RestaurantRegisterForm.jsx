// this file contains the styling and input fields for RestaurantRegister.jsx

import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const RegisterForm = ({ handleSubmit, formData, handleChange, setFormData, category, setCatergory, err, title }) => {
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
                                 {/* restaurant name */}
                                 <Grid item xs={12}>
                                    <TextField
                                        value={formData.restaurantname}
                                        onChange={e => handleChange(e)}
                                        autoComplete="given-name"
                                        name="restaurantname"
                                        required
                                        fullWidth
                                        id="restaurantname"
                                        label="Restaurant Name"
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
                                 {/* category drop down menu */}
                                 <Grid item xs={12}>
                                <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth >
                                <InputLabel sx={{ fontSize: 12}}
                                 value={formData.category}
                                 >Select Category </InputLabel>
                                 <Select
                                 labelId="category"
                                 id="category"
                                 value={category}
                                 label="Category"
                                 onChange={handleChange} >
                                <MenuItem value={1} sx={{ fontSize: 15}}>American</MenuItem>
                                <MenuItem value={2} sx={{ fontSize: 15}}>Indian</MenuItem>
                                <MenuItem value={3} sx={{ fontSize: 15}}>Italian</MenuItem>
                                <MenuItem value={4} sx={{ fontSize: 15}}>Japanese</MenuItem>
                                <MenuItem value={5} sx={{ fontSize: 15}}>Mexican</MenuItem>
                                </Select>
                                </FormControl>
                                </Box>
                                </Grid>

                                {/* add images */}
                                <Grid item xs={12}>
                                <Stack spacing={2} direction="row">
                                <Button variant ="text" sx={{ fontSize: 15, color: 'gray' }}>Add Images</Button>
                                <Button variant="contained" sx={{ background:'purple', borderRadius: 50}}
                                component="label">
                                {/* Upload Images  */}
                                <input
                                  type="file"
                                //   hidden
                                 />
                                </Button>
                                </Stack>
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
                                </Box>
                                </Grid>
                            </Grid>

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
