/* eslint-disable no-unused-vars */
/* eslint-disable import/no-anonymous-default-export */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'; 

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';
import { Icon } from '@material-ui/core';
import useStyles from './Styles';
import RegistrationModal from './RegistrationModal'


const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="#">
        OnlyPans
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const theme = createTheme();

export default function TransitionsModal() {
  const [errors, setErrors] = useState("");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();
  const classes = useStyles();

  const logo = require('../static/images/onlypansegglogo.png')

  const loginChangeHandler = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', loginInfo, { withCredentials: true })
      .then(res => {
        console.log(res)
        if (res.data.message === "success!") {
          history.push('/')
        } else if (res.data.message) {
          console.log(res.data.message)
          setErrors(res.data)
        }
      })
      .catch(err => console.log(err));
  };

  const googleSuccess = async (res) => {
    axios.post('http://localhost:8000/api/google/login',
      res.profileObj
      , { withCredentials: true })
      .then(res => {
        console.log(res)
        if (res.data.message === "success!") {
          history.push('/')
        } else {
          setErrors(res.data)
        }
      })
      .catch(err => console.log(err));
  };

  const googleFailure = () => {
    console.log("Google sign in not working!");
  };

  return (
    <div>
      <Button onClick={handleOpen}>Log In</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {/* ENTER FORM HERE */}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar variant="square"
                  src={logo} alt="logo"
                  sx={{
                    height: 42,
                    width: 53,
                    mb: 3,
                    pl: 1
                  }}
                >
                </Avatar>
                <Typography component="h1" variant="h5">
                  Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  {errors.message ? <p className="text-danger">{errors.message}</p> : ""}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={loginChangeHandler}
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
                    onChange={loginChangeHandler}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    onclick={handleClose}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <GoogleLogin
                    clientId='28144132869-865k00rjanquba9oel14bbtt75rn8tv5.apps.googleusercontent.com'
                    render={(renderProps) => (
                      <Button className={classes.googleButton}
                        color="primary"
                        fullWidth
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        startIcon={<Icon />}
                        variant="contained"
                        sx={{ mb: 2 }}
                      >Google Sign In </Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                  />
                  <Grid container
                    sx={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Grid item>
                      <RegistrationModal variant="body2"
                      onclick={handleClose}/>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 8, mb: 4, pt: 4 }} />
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
