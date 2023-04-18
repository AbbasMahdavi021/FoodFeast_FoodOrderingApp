import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import UserContext from '../context'

export default function Login() {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    let obj = {
      ...formData,
    }

    obj[e.target.name] = e.target.value
    setFormData(obj)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!formData.username) {
      setErr('Username field is required')
      return
    }

    if (!formData.password) {
      setErr('Password field is required')
      return
    }

    try {
      const res = await axios.post('/auth/login', formData)
      if (res && res.data && res.data.success) {
        setUser({
          // the user data is passed from the auth controller on the backend
          id: res.data.id,
          username: res.data.username,
          isDriver: res.data.isDriver,
          isRestaurantOwner: res.data.isRestaurantOwner,
          email: res.data.email,
        })

        navigate('/')
      }
    } catch (err) {
      console.error('Error:', err) 
      setErr(
        err.response ? err.response.data : 'An error occurred during login.',
      )
    }
  }

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
    <Grid container component="main" sx={{ height: '90vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/brand/banner.jpg)`, //Change later
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
          <Typography component="h1" variant="h5" fontSize={40} align="center">
            Sign in
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              value={formData.name}
              onChange={(e) => handleChange(e)}
              autoComplete="given-name"
              name="username"
              label="Username"
              required
              fullWidth
              autoFocus
              InputLabelProps={{
                sx: {
                  fontSize: '1.2rem',
                },
              }}
              inputProps={{
                style: {
                  fontSize: '2rem',
                },
              }}
            />
            <TextField
              value={formData.name}
              onChange={(e) => handleChange(e)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              InputLabelProps={{
                sx: {
                  fontSize: '1.2rem',
                },
              }}
              inputProps={{
                style: {
                  fontSize: '2rem',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, fontSize: 20 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/register" variant="h6" sx={{ fontSize: 20 }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>

            {err && (
              <p
                style={{ fontSize: '20px', color: 'red', textAlign: 'center' }}
              >
                {err}
              </p>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
