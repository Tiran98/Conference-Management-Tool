import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Avatar, Button, CssBaseline, Grid, Typography, Container, Divider } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';

import useStyles from './styles';

const Login = ({ setDrawerState }) => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [userType, setUserType] = useState("attendee");
    const [userToken, setUserToken] = useState();
    const [userProfile, setUserProfile] = useState([]);
    const [formData, setFormData] = useState([]);
    const isFirstRender = useRef(true);
    const history = useHistory();

    const CssTextField = withStyles({
        root: {
          '& .MuiInputLabel-root': {
            color: '#a3a3a3',
          },
          '& .MuiTextField-root': {
            color: '#a3a3a3',
          },
          '& .MuiFormHelperText-root': {
            color: '#a3a3a3',
          },
          '& label.Mui-focused': {
            color: '#a3a3a3',
          },
          '& .MuiInputBase-input':{
            color: '#ffffff',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#a3a3a3',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#a3a3a3',
            },
            '&:hover fieldset': {
              borderColor: '#cccccc',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFB101',
            },
          },
        },
        // input: {
        //   color: "white"
        // }
    })(TextField);

    useEffect(() => {
        handleDrawerClose();

        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }

        if(userType == 'attendee' || userType == 'researcher' || userType == 'workshop_presenter') {
          submitForm(formData);
        }

        localStorage.setItem('userToken', userToken);

    }, [formData, userToken]);


    useEffect(() => {
      localStorage.setItem('profile', JSON.stringify(userProfile));
      localStorage.setItem('userType', JSON.stringify(userType));
    }, [userProfile])

    const onSubmit = (data) => {
    
      setFormData({
          email : data.email,
          password : data.password,
          userType : userType
      })

      // submitForm(formData);
    }

    const submitForm = (data) => {
      // console.log(data);

      axios.post('http://localhost:5000/api/user/login',
      {
        email : data.email,
        password : data.password,
        userType : data.userType

      }). then((response) => {
        setUserToken(response.data.token);
        setUserProfile(response.data.user);
        history.push('/');
      }).catch((err) => {
        console.log(err);
      })

    }

    // const fetchUser = async() => {
    //   const response = await fetch('http://localhost:5001/vehicles/');
    //   const data = await response.json();
    //   setVehicles(data);
    // }

    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const handleRadioChange = (event) => {
        setUserType(event.target.value, console.log(userType));
    };

    
    return (
        <div className={classes.body}>
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>Sign In</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Email" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid> 
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Password" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <FormLabel component="legend" className={classes.radioGoupLabel}>Account Type</FormLabel>
                            <RadioGroup aria-label="user_type" name="user_type" row value={userType} onChange={handleRadioChange}>
                                <FormControlLabel value="attendee" control={<Radio className={classes.radioGoup} />} label="Attendee" className={classes.radioGoup} />
                                <FormControlLabel value="researcher" control={<Radio className={classes.radioGoup} />} label="Researcher" className={classes.radioGoup} />
                                <FormControlLabel value="workshop_presenter" control={<Radio className={classes.radioGoup} />} label="Workshop Presenter" className={classes.radioGoup} />
                            </RadioGroup>
                        </Grid>     
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                       Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button component={Link} to="/register" size="small" style={{ color: '#ffffff' }}>
                                Don't have an account? Sign Up.
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            </Container>
           
        </div>
    )
}

export default Login;
