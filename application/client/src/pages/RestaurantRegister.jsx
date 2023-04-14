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
        name: "",
        email: "",
        username: "",
        password: "",
        restaurant: "",
        phone: "",
        address: ""
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

        if (!formData.name) {
            setErr("Name field is required");
            return;
        }

        if (!formData.username) {
            setErr("Username field is required");
            return;
        }

        if (!formData.restaurantname) {
            setErr("Restaurant Name field is required");
            return;
        }

        if (!formData.address) {
            setErr("Restaurant Address field is required ");
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
                        <Typography component="h1" variant="h5" fontSize={40} align='center'>
                            Register Restaurant
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                                    <TextField
                                        value={formData.name}
                                        onChange={e => handleChange(e)}
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
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
                                <Grid item xs={12}>
                                    <TextField
                                        value={formData.phone}
                                        onChange={e => handleChange(e)}
                                        type="number"
                                        name="phone"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone"
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
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: 20 }}
                            >
                                Register 
                            </Button>

                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/restaurantlogin" variant="body2" sx={{ fontSize: 20 }}>
                                        Already registered ? Login here.
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