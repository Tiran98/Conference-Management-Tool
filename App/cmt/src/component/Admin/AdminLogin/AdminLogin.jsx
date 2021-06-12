import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Avatar, Button, CssBaseline, Grid, Typography, Container, Divider } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';

import useStyles from './styles';

const AdminLogin = ({ setDrawerState }) => {
    const classes = useStyles();
    const { control, handleSubmit, reset } = useForm();
    const [userToken, setUserToken] = useState("");
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
        input: {
          color: "white"
        }
    })(TextField);

    useEffect(() => {
        handleDrawerClose();

        if (isFirstRender.current) {
          isFirstRender.current = false // toggle flag after first render/mounting
          return;
        }

        submitForm(formData);

    }, [formData]);

    useEffect(() => {
      console.log(userToken);
      localStorage.setItem('userToken', userToken);
   }, [userToken])

    const onSubmit = (data) => {
      setFormData({
          email : data.email,
          password : data.password,
      })

      // submitForm(formData);
    }

    const submitForm = (data) => {
      console.log(data);

      axios.post('http://localhost:5000/api/admin/adminLogin',
      {
        email : data.email,
        password : data.password,

      }). then((response) => {
        setUserToken(response.data);
        history.push('/admin');
      }).catch((err) => {
        console.log(err);
      })

    }

    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    
    return (
        <div className={classes.body}>
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>Admin Sign In</Typography>
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
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                       Sign In
                    </Button>
                </form>
            </div>
            </Container>
           
        </div>
    )
}

export default AdminLogin;
