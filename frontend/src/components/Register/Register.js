import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography, Container} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Register() {
    const [registerErrors, setRegisterErrors] = useState({})
    const theme = createTheme();
    const navigate = useNavigate();
  
    const callRegisterApi = (e) => {
      e.preventDefault();
      fetch('http://localhost:8080/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.elements.username.value,
          password: e.target.elements.password.value,
          firstname: e.target.elements.firstname.value,
          lastname: e.target.elements.lastname.value,
          email: e.target.elements.email.value,
          phone: e.target.elements.phone.value,
        })
      })
      .then(
        (r)=>{
          if (r.status === 200) {
            navigate("/")
          }
          else if (r.status === 409) {
            r.json().then((json)=>{
              let error = json["error"];
              console.log(error);
              let newregisterErrors = {...registerErrors}
              newregisterErrors['username'] = error
              setRegisterErrors(newregisterErrors)
            })
          }
            else {
              r.json().then((json)=>{
                let error = json["error"];
                console.log(error);
                let newregisterErrors = {...registerErrors}
                newregisterErrors['server'] = error
                setRegisterErrors(newregisterErrors)
              })
            }
          
        },
        (r)=>{
          r.json().then((rr)=>{
            let error = rr.json();
              let newregisterErrors = {...registerErrors}
              newregisterErrors['server'] = error
              setRegisterErrors(newregisterErrors)
          })
        }
      )
    }
    useEffect(() => {
      window.loginload()
    }, []);
    return (

      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={callRegisterApi} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  name="username"
                  label="UserName"
                  autoComplete="username"
                />                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  autoComplete="tel-country-code"
                />
              </Grid>              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Allow to receive updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>      
   
    );
  }

export default Register;