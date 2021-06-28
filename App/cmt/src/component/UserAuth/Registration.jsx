import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Radio, RadioGroup, FormLabel, TextField, FormControlLabel, Paper, Avatar, Button, CssBaseline, Grid, Typography, Container, Divider } from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { withStyles } from '@material-ui/core/styles';


import useStyles from './styles';

const getColor = (props) => {
    if (props.isDragAccept) {
        return '#FFB101';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#afafaf';
  }
  
  const ContainerDrop = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #171717;
    color: #bdbdbd;
    outline: none;
    transition: border .24s ease-in-out;
  `;

const Registration = ({ setDrawerState }) => {
    const classes = useStyles();
    const [succeeded, setSucceeded] = useState(false);
    const [formData, setFormData] = useState([]);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [file, setFile] = useState({ files: [] });
    const [userType, setUserType] = useState("");
    const { control, handleSubmit, reset } = useForm();
    const history = useHistory();
    var formDataNew = new FormData();
    const {
        acceptedFiles, 
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
    } = useDropzone();

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

    const cardStyle = {
        style: {
          base: {
            iconColor: '#a3a3a3',
            color: "#ffffff",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "14px",
            "::placeholder": {
              color: "#a3a3a3"
            }
          },
          invalid: {
            color: "#992402",
            iconColor: "#992402"
          }
        }
    };

    useEffect(() => {
        handleDrawerClose();

        window .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setClientSecret(data.clientSecret);
        });
      
    }, []);

    const onSubmit = (data) => {
    
        formDataNew.append('firstName', data.firstName);
        formDataNew.append('lastName', data.lastName);
        formDataNew.append('email', data.email);
        formDataNew.append('password', data.password);
        formDataNew.append('userType', userType);
        formDataNew.append('phone', data.phone);
        formDataNew.append('city', data.city);
        formDataNew.append('researchTitle', data.researchTitle);
        formDataNew.append('workshopTitle', data.workshopTitle);
        formDataNew.append('file', acceptedFiles[0]);

        submitForm(formDataNew);

        // for(var pair of formDataNew.entries()) {
        //         console.log(pair[0]+', '+pair[1]);
        // }
    }

    const submitForm = (data) => {
        // console.log(data);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('http://localhost:5000/api/user/register', data, config
        ). then((response) => {
            console.log(response.message);
        }).catch((err) => {
            console.log(err);
        })

    }

    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const handleRadioChange = (event) => {
        setUserType(event.target.value, console.log(userType));
    };

    const handleCardChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handlePaymentSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });
        if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
        } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
        }
    };

    const files = acceptedFiles.map(file => (
        <Typography variant="caption" key={file.path}>
          {file.path} - {(file.size / 1024 / 1024).toFixed(2)} MB
        </Typography>
    ));

    const AttendeeSection = () => (
        <div>
            <Grid container spacing={2} className={classes.sectionHeader}>
                <Grid item xs={4}>
                    <Typography variant="body1" >Attendee Section</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Divider style={{ backgroundColor: '#cccccc' }}  />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormLabel component="legend" className={classes.radioGoupLabel}>Enter Your Card Details</FormLabel>
                    <div style={{ border: "1px solid #a3a3a3", padding: 15, borderRadius: 5, marginTop: 10  }}>
                        <CardElement id="card-element" onChange={() => handleCardChange} options={cardStyle} />
                    </div>
                    {error && (
                        <div className="card-error" role="alert">{error}</div>
                    )}
                </Grid>
            </Grid>
        </div>
    );

    const ResearcherSection = () => (
        <div>
            <Grid container spacing={2} className={classes.sectionHeader}>
                <Grid item xs={4}>
                    <Typography variant="body1" >Researcher Section</Typography>
                </Grid>
                <Grid item xs={8}>
                    <Divider style={{ backgroundColor: '#cccccc' }}  />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="Phone" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="City" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Controller
                    name="researchTitle"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="Research Paper Title" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ContainerDrop {...getRootProps({isDragActive, isDragAccept, isDragReject})} gutterBottom>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop the research file here</p>
                    </ContainerDrop>
                    <aside>
                        <Typography variant="caption">File : </Typography> {files}
                    </aside>
                </Grid>
            </Grid>
        </div>
    );

    const WorkshopSection = () => (
        <div>
            <Grid container spacing={2} className={classes.sectionHeader}>
                <Grid item xs={6}>
                    <Typography variant="body1" >Workshop Presenter Section</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Divider style={{ backgroundColor: '#cccccc' }}  />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="Phone" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                    name="city"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="City" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Controller
                    name="workshopTitle"
                    control={control}
                    defaultValue=""
                    render={({ field }) => 
                        <CssTextField fullWidth label="Workshop Title" variant="outlined" color="primary" {...field} />}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ContainerDrop {...getRootProps({isDragActive, isDragAccept, isDragReject})} gutterBottom>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop the workshop proposol here</p>
                    </ContainerDrop>
                    <aside>
                        <Typography variant="caption">File : </Typography> {files}
                    </aside>
                </Grid>
            </Grid>
        </div>
    );

    return (
        <div className={classes.body}>
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" gutterBottom>Sign up</Typography>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="First Name" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Last Name" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <Controller
                                name="email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Email" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid> 
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="password"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Password" type="password" variant="outlined" color="primary" {...field} />}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="repassword"
                                control={control}
                                defaultValue=""
                                render={({ field }) => 
                                <CssTextField fullWidth label="Confirm Password" type="password" variant="outlined" color="primary" {...field} />}
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
                    {userType == "researcher" ?
                    <ResearcherSection /> 
                    : userType == "workshop_presenter" ?
                    <WorkshopSection /> 
                    : userType == "attendee" ?
                    <AttendeeSection /> : null }  
                    <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>
                        {userType == "attendee" ? "Pay 5$ to Sign Up" : "Sign Up" }
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button component={Link} to="/login" size="small" style={{ color: '#ffffff' }}>
                                Already have an account? Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
            </Container>
           
        </div>
    )
}

export default Registration;
