
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  InputAdornment,
} from '@mui/material';
import Sidebackground from '../../components/login/SideBackground'
import LinksHeader from '../../components/login/LinksHeader'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { authLogin } from '../../redux/slices/authSlice'
import type { user as userType } from '../../redux/slices/authSlice'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.auth.user)

  const onSubmit = async (event: any) => {
    event.preventDefault()
    const form = event.target
    const username: string = form.username.value
    const password: string = form.password.value
    await dispatch(authLogin({ username, password })).unwrap()
  }

  useEffect(() => {
    if (user && (user as userType).id) {
      navigate("/")
    }

  }, [user, navigate])

  return (
    <Grid container sx={{
      height: '100vh',
      minWidth: '300px'
    }}>

      <Grid item md={5} sx={{
        display: { xs: 'none', md: 'block' }
      }}>
        <Sidebackground />
      </Grid>

      <Grid container item xs={12} md={7} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <LinksHeader text="Don't have an account?" link="/signup" buttonText="Create account" />

        <Box component="form" onSubmit={onSubmit} sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '60%',
          marginBottom: '80px',
          "@media (max-width: 1400px)": {
            width: '100%',
            maxWidth: '70%'
          },
          "@media (max-width: 959px)": {
            width: '100%',
            maxWidth: '50%'
          }
        }} >

          <Typography variant="h4" gutterBottom sx={{
            fontWeight: 'bold',
            marginBottom: '32px',
            whiteSpace: 'nowrap'
          }}>
            Welcome back!
          </Typography>


          <FormControl margin="normal" required fullWidth>
            <TextField
              aria-label="username"
              label="Username"
              name="username"
              type="text"

              inputProps={{
                style: { fontSize: 20 }
              }}

            />
          </FormControl>

          <FormControl margin="normal" required fullWidth>
            <TextField
              label="password"
              aria-label="password"

              type="password"
              name="password"

              InputProps={{
                endAdornment: <InputAdornment position="end"><Box sx={{
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}>Forgot?</Box></InputAdornment>,
              }}

            />
          </FormControl>


          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '32px'
          }}>
            <Button type="submit" color="primary" variant="contained" size="large" sx={{
              paddingLeft: '64px',
              paddingRight: '64px',
              paddingTop: '16px',
              paddingBottom: '16px'
            }}>
              Login
            </Button>
          </Box>

        </Box>

      </Grid>

    </Grid>
  );
};

export default Login;