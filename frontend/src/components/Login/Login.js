import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Login() {
    const [loginErrors, setLoginErrors] = useState({})
    const navigate = useNavigate();
    const theme = createTheme();
    const callLoginApi = (e) => {
      e.preventDefault();
      fetch('http://localhost:8080/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: e.target.elements.username.value,
          password: e.target.elements.password.value,
        })
      })
      .then(
        (r)=>{
          if (r.status === 200)
            navigate("/home")
          else if (r.status === 401) {
            console.log(r);
            r.json().then((json)=>{
              console.log(json);
              let error = json["error"];
              console.log(error);
              let newLoginErrors = {...loginErrors}
              newLoginErrors['username'] = error
              setLoginErrors(newLoginErrors)
            })
          }
        },
       
        (r)=>{
          r.json().then((rr)=>{
            let error = rr.json();
              let newLoginErrors = {...loginErrors}
              newLoginErrors['server'] = error
              setLoginErrors(newLoginErrors)
          })
        }
      )
    }
    
    useEffect(() => {
      // window.loginload()
    }, []);
    return (

      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 16,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={callLoginApi} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="username"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link onClick={()=>navigate("/register")} href="" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>                              
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      
    );
  }

export default Login;