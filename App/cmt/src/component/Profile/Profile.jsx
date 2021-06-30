import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { Typography, Paper, Grid, Divider, Table , Button, TableContainer, TableHead, TableRow, TextField, Badge, FormLabel } from '@material-ui/core';
import MuiTableCell from "@material-ui/core/TableCell";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { withStyles } from '@material-ui/core/styles';

import useStyles from './styles';

const Profile = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const { control, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState([]);
    const [formDataReview, setFormDataReview] = useState([]);
    var formDataNew = "";
    const [editForm, setEditForm] = useState(false);
    const [requestForm, setRequestForm] = useState(false);
    const [paymentForm, setPaymentForm] = useState(false);
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userType, setUserType] = useState(JSON.parse(localStorage.getItem('userType')));

    const TableCell = withStyles({
        root: {
          borderBottom: "none"
        }
    })(MuiTableCell);

    const cardStyle = {
        style: {
          base: {
            iconColor: '#a3a3a3',
            color: "#141414",
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
            color: '#000000',
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
    })(TextField);

    useEffect(() => {
        setEditForm(false);
        setUserProfile(JSON.parse(localStorage.getItem('profile')));
        setUserType(JSON.parse(localStorage.getItem('userType')));
    }, [location]);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false // toggle flag after first render/mounting
            return;
        }

        submitForm(formData);
    }, [formData]);

    const onSubmit = (data) => {
        if(data.password == "" || data.password== null) {
            setFormData({
                id: data._id,
                firstName : data.firstName,
                lastName : data.lastName,
                phone : data.phone,
                city : data.city,
                userType : userType
            })
        } else {
            setFormData({
                firstName : data.firstName,
                lastName : data.lastName,
                phone : data.phone,
                password: data.password,
                city : data.city,
                userType : userType
            })
        }

        // localStorage.removeItem("profile"); 
    }

    const submitForm = (data) => {
        console.log(data);

        axios.put(`http://localhost:5000/api/user/register/${userProfile._id}`,
      {
        firstName : data.firstName,
        lastName : data.lastName,
        phone : data.phone,
        password: data.password,
        city : data.city,
        userType : userType

      }). then((response) => {
        localStorage.setItem('profile', JSON.stringify(response.data));
        handleUpdate();
        history.push('/profile');
      }).catch((err) => {
        console.log(err);
      })

    }

    const onSubmitRequest = (data) => {

        if(userType == "researcher") {
            formDataNew = {
                "userId": userProfile._id,
                "conferenceId" : "1111",
                "userType" : userType,
                "docName" : userProfile.researchTitle,
                "file" : userProfile.file,
                "docStatus" : userProfile.fileStatus,
                "comment" : data.comment
            }
        } else if (userType == "workshop_presenter") {
            formDataNew = {
                "userId": userProfile._id,
                "conferenceId" : "1111",
                "userType" : userType,
                "docName" : userProfile.workshopTitle,
                "file" : userProfile.file,
                "docStatus" : userProfile.fileStatus,
                "comment" : data.comment
            }
        }

        submitFormRequest(formDataNew);
        
    }

    const submitFormRequest = (data) => {

        axios.post('http://localhost:5000/api/reviewRequest', data
        ). then((response) => {
            history.push('/');
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })

    }

    const handleUpdate = () => {
        if (editForm) setEditForm(false);
        else setEditForm(true);
    };

    const handleRequest = () => {
        if (requestForm) setRequestForm(false);
        else setRequestForm(true);
    };

    const handlePayment = () => {
        if (paymentForm) setPaymentForm(false);
        else setPaymentForm(true);
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

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.pageTitle} gutterBottom>Profile</Typography>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TableContainer>
                                <Table >
                                    <TableRow>
                                        <TableHead><TableCell>First Name</TableCell></TableHead>
                                        {!editForm ? 
                                        <TableCell>{userProfile.firstName}</TableCell> :
                                        <TableCell>
                                            <Controller
                                                name="firstName"
                                                control={control}
                                                defaultValue={userProfile.firstName}
                                                render={({ field }) => 
                                                <CssTextField fullWidth variant="outlined" size="small" color="primary" {...field} />}
                                            />
                                        </TableCell> }
                                    </TableRow>
                                    <TableRow>
                                        <TableHead><TableCell>Last Name</TableCell></TableHead>
                                        {!editForm ? 
                                        <TableCell>{userProfile.lastName}</TableCell> :
                                        <TableCell>
                                            <Controller
                                                name="lastName"
                                                control={control}
                                                defaultValue={userProfile.lastName}
                                                render={({ field }) => 
                                                <CssTextField fullWidth variant="outlined" size="small" color="primary" {...field} />}
                                            />
                                        </TableCell> }
                                    </TableRow>
                                    <TableRow>
                                        <TableHead><TableCell>Email</TableCell></TableHead>
                                        <TableCell>{userProfile.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableHead><TableCell>{editForm ? "New Password" : "Password"}</TableCell></TableHead>
                                        {!editForm ? 
                                        <TableCell>•••••••</TableCell> :
                                        <TableCell>
                                            <Controller
                                                name="password"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => 
                                                <CssTextField fullWidth type="password" variant="outlined" size="small" color="primary" {...field} />}
                                            />
                                        </TableCell> }
                                    </TableRow>
                                    {editForm ? 
                                    <TableRow>
                                        <TableHead><TableCell>Confirm Password</TableCell></TableHead>
                                        <TableCell>
                                            <Controller
                                                    name="repassword"
                                                    control={control}
                                                    defaultValue=""
                                                    render={({ field }) => 
                                                    <CssTextField fullWidth type="password" variant="outlined" size="small" color="primary" {...field} />}
                                                />
                                        </TableCell>
                                    </TableRow> : null}
                                    <TableRow>
                                        <TableHead><TableCell>Phone</TableCell></TableHead>
                                        {!editForm ? 
                                        <TableCell>{userProfile.phone}</TableCell> :
                                        <TableCell>
                                            <Controller
                                                name="phone"
                                                control={control}
                                                defaultValue={userProfile.phone}
                                                render={({ field }) => 
                                                <CssTextField fullWidth variant="outlined" size="small" color="primary" {...field} />}
                                            />
                                        </TableCell> }
                                    </TableRow>
                                    <TableRow>
                                        <TableHead><TableCell>City</TableCell></TableHead>
                                        {!editForm ? 
                                        <TableCell>{userProfile.city}</TableCell> :
                                        <TableCell>
                                            <Controller
                                                name="city"
                                                control={control}
                                                defaultValue={userProfile.city}
                                                render={({ field }) => 
                                                <CssTextField fullWidth variant="outlined" size="small" color="primary" {...field} />}
                                            />
                                        </TableCell> }
                                    </TableRow>
                                    <TableRow>
                                        <TableHead><TableCell>User Type</TableCell></TableHead>
                                        <TableCell style={{ "textTransform": "capitalize" }}>{userType}</TableCell>
                                    </TableRow>
                                </Table>
                            </TableContainer>
                            {editForm ? 
                            <div className={classes.btnGroup}>
                                <Button type="submit" variant="contained" className={classes.editBtn} color="secondary">Submit</Button>
                                <Button variant="contained" className={classes.editBtn} color="primary" onClick={handleUpdate}>Cancel</Button>
                            </div>
                            
                            : <Button variant="contained" className={classes.editBtn} color="primary" onClick={handleUpdate}>Update Details</Button>}
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.pageTitle} gutterBottom>Research Document</Typography>
                                <Divider />
                                <TableContainer>
                                    <Table>
                                        <TableRow>
                                            <TableHead><TableCell>Document Name</TableCell></TableHead>
                                            <TableCell>{userType == "researcher" ? userProfile.researchTitle : userType == "workshop_presenter" ? userProfile.workshopTitle : null}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableHead><TableCell>Document Status</TableCell></TableHead>
                                            <TableCell style={{ "textTransform": "capitalize" }}>
                                                <Badge color={userProfile.fileStatus == "approved" ? "secondary" : userProfile.fileStatus == "declined" ?  "error" : "primary"} variant="dot">
                                                    {userProfile.fileStatus}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </TableContainer>
                                {userProfile.fileStatus == "pending" ? 
                                <Button variant="contained" disabled className={classes.editBtn} color="primary">Request a Review</Button> :
                                <div className={classes.btnGroup}>
                                    <Button variant="contained" className={classes.editBtn} color="primary" onClick={handleRequest}>Request a Review</Button>
                                    {userProfile.fileStatus == "approved" && userType == "researcher" ? 
                                    <Button variant="contained" className={classes.editBtn} color="secondary" onClick={handlePayment}>Make the Payment</Button> : null}
                                </div>}
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            {requestForm ? 
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.pageTitle} gutterBottom>Review Request</Typography>
                                <Divider />
                                <form style ={{ marginTop: 20 }} onSubmit={handleSubmit(onSubmitRequest)}>
                                    <Controller
                                    name="comment"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => 
                                        <CssTextField fullWidth multiline rows={3} variant="outlined" label="Write your comment" color="primary" {...field} />}
                                    />
                                <div className={classes.btnGroup}>
                                    <Button type="submit" variant="contained" className={classes.editBtn} color="secondary">Submit</Button>
                                    <Button variant="contained" className={classes.editBtn} color="primary" onClick={handleRequest}>Cancel</Button>
                                </div>
                                </form>
                            </Paper> : null}
                            {paymentForm && userProfile.payment == "none" ? 
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.pageTitle} gutterBottom>Payment</Typography>
                                <Divider  style ={{ marginBottom: 10 }}/>
                                <Typography variant="body2" gutterBottom>You have to make the neccesary payments before the conference.</Typography>
                                <Typography variant="body2" color="error" gutterBottom>Payment Amount : 10$</Typography>
                                <form onSubmit={handleSubmit(onSubmitRequest)}  style ={{ marginTop: 20 }}> 
                                    <FormLabel component="legend" className={classes.radioGoupLabel}>Enter Your Card Details</FormLabel>
                                        <div style={{ border: "1px solid #a3a3a3", padding: 15, borderRadius: 5, marginTop: 10  }}>
                                            <CardElement id="card-element" onChange={() => handleCardChange} options={cardStyle} />
                                        </div>
                                        {error && (
                                            <div className="card-error" role="alert">{error}</div>
                                        )}
                                <div className={classes.btnGroup}>
                                    <Button type="submit" variant="contained" className={classes.editBtn} color="secondary">Pay</Button>
                                    <Button variant="contained" className={classes.editBtn} color="primary" onClick={handlePayment}>Cancel</Button>
                                </div>
                                </form>
                            </Paper> : 
                            userProfile.payment == "completed" && paymentForm ? 
                            <Paper className={classes.paper}>
                                <Typography variant="h5" className={classes.pageTitle} gutterBottom>Payment</Typography>
                                <Divider  style ={{ marginBottom: 10 }}/>
                                <Typography variant="body2" gutterBottom>You have completed the payment. Thank you!</Typography>
                                <div className={classes.btnGroup}>
                                    <Button variant="contained" className={classes.editBtn} color="primary" onClick={handlePayment}>Cancel</Button>
                                </div>
                            </Paper>
                            :null}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>    
        </div>
    )
}

export default Profile;
