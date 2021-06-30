import React from 'react'
import { Grid,Button, TextField, Divider, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import 'date-fns';
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker,} from '@material-ui/pickers';
import axios from 'axios';

import useStyles from './styles';

const AddConference = () => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    var formDataNew = "";
    const { control, handleSubmit, reset } = useForm();
    const [values, setValues] = React.useState({
        password: '',
        r_password: '',
        e_c_password: '',
        r_c_password: '',
        showEditorPassword: false,
        showEditorConfirmPassword: false,
        showReviewerPassword: false,
        showReviewerConfirmPassword: false,
    });

    const [confData, setConfData] = React.useState({
        ConfName:'',
        confManName:'',
        confManEmail:'',
        confManPhone:'',
        confManAddr:'',
        ConfVenue:'',
        confDate:''
    });

    const [editorData, setEditorData] = React.useState({
        editorName:'',
        editorEmail:'',
    });

    const [reviewerData, setReviewerData] = React.useState({
        reviewerName:'',
        reviewerEmail:'',
    })

    const handleChangeConf =(event) =>{
        const {name, value} = event.target;

        setConfData(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        });
        setEditorData(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        });
        setReviewerData(prevInput => {
            return{
                ...prevInput,
                [name]: value
            }
        })
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleClick =(event) =>{
        event.preventDefault();
        const newConf = {
            conferenceName:confData.ConfName,
            managerName:confData.confManName,
            managerEmail:confData.confManEmail,
            managerPhone:confData.confManPhone,
            managerAddress:confData.confManAddr,
            conferenceVenue:confData.ConfVenue,
            conferenceDate:selectedDate
        }

        const newEditor = {
            editorName:editorData.editorName,
            editorEmail:editorData.editorEmail,
            e_Password:values.password
        }

        const newReviewer = {
            reviewerName:reviewerData.reviewerName,
            reviewerEmail:reviewerData.reviewerEmail,
            r_Password:values.r_password
        }
        
        axios.post('http://localhost:5000/api/conference/addConf', newConf)
        console.log(newConf)
        axios.post('http://localhost:5000/api/editor/addEditor', newEditor)
        console.log(newEditor)
        axios.post('http://localhost:5000/api/reviewer/addReviewer', newReviewer)
        console.log(newReviewer)
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleClickShowEditorPassword = () => {
        setValues({ ...values, showEditorPassword: !values.showEditorPassword });
    };
    const handleClickShowEditorConfirmPassword = () => {
        setValues({ ...values, showEditorConfirmPassword: !values.showEditorConfirmPassword });
    };
    const handleClickShowReviewerPassword = () => {
        setValues({ ...values, showReviewerPassword: !values.showReviewerPassword });
    };
    const handleClickShowReviewerConfirmPassword = () => {
        setValues({ ...values, showReviewerConfirmPassword: !values.showReviewerConfirmPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (data) => {
        formDataNew = {
            "conferenceName": data.ConfName,
            "managerName" : data.confManName,
            "managerEmail" : data.confManEmail,
            "managerPhone" : data.confManPhone,
            "managerAddress" : data.confManAddr,
            "conferenceVenue" : data.ConfVenue
        }

        console.log(data);
    }

    return (
        <div>
            <form className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className={classes.adminTitle}>
                            <h1 className={classes.adminTitleh}>Add New</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Conference</h1>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField onChange={handleChangeConf} style={{width:900}} id="ConfName" name="ConfName" label="Conference Name" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <h6>Conference Manager Details</h6>
                    </Grid>                    
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:500}} id="confManName" name="confManName" label="Conference Manager Name" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:372}} id="confManEmail" name="confManEmail" label="Email Address" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:500}} id="confManAddr" name="confManAddr" label="Address" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:372}} id="confManPhone"  name="confManPhone" label="Phone Number" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <TextField onChange={handleChangeConf} style={{width:500}} id="ConfVenue" name="ConfVenue" label="Conference Venue" variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Conference Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}/>
                        </MuiPickersUtilsProvider>        
                    </Grid>
                    <Grid item xs={3}>
                        <h6>Create Editor for the Conference</h6>
                    </Grid>
                    <Grid item xs={9} style={{marginTop:10,marginLeft:-90}}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:500}} id="editorName" name="editorName" label="Editor Name" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:372}} id="editorEmail" name="editorEmail" label="Email Address" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <FormControl className={classes.passwordText} variant="outlined">
                                <InputLabel htmlFor="e_Password">Password</InputLabel>
                                <OutlinedInput
                                    id="e_Password"
                                    name="e_Password"
                                    type={values.showEditorPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowEditorPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showEditorPassword? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}/>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <FormControl className={classes.confirmPasswordText} variant="outlined">
                                <InputLabel htmlFor="e_ConfirmPassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="e_ConfirmPassword"
                                    name="e_ConfirmPassword"
                                    type={values.showEditorConfirmPassword ? 'text' : 'e_c_password'}
                                    value={values.e_c_password}
                                    onChange={handleChange('e_c_password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowEditorConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showEditorConfirmPassword? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}/>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <h6>Create Reviewer for the Conference</h6>
                    </Grid>
                    <Grid item xs={9} style={{marginTop:10,marginLeft:-90}}>
                        <Divider />
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:500}} id="reviewerName" name="reviewerName" label="Reviewer Name" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <TextField onChange={handleChangeConf} style={{width:372}} id="reviewerEmail" name="reviewerEmail" label="Revieweer Address" variant="outlined" fullWidth />
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10}}>
                        <div>
                            <FormControl className={classes.passwordText} variant="outlined">
                                <InputLabel htmlFor="r_Password">Password</InputLabel>
                                <OutlinedInput
                                    id="r_Password"
                                    name="r_Password"
                                    type={values.showReviewerPassword ? 'text' : 'r_password'}
                                    value={values.r_password}
                                    onChange={handleChange('r_password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowReviewerPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showReviewerPassword? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}/>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{marginTop:-10,marginLeft:-70}}>
                        <div>
                            <FormControl className={classes.confirmPasswordText} variant="outlined">
                                <InputLabel htmlFor="r_ConfirmPassword">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="r_ConfirmPassword"
                                    name="r_ConfirmPassword"
                                    type={values.showReviewerConfirmPassword ? 'text' : 'r_c_password'}
                                    value={values.r_c_password}
                                    onChange={handleChange('r_c_password')}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowReviewerConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        >
                                        {values.showReviewerConfirmPassword? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    labelWidth={70}/>
                            </FormControl>
                        </div>
                    </Grid>
                    <br></br>
                    <Grid item xs={12}>
                        <Button onClick={handleClick} type="submit" className={classes.addConfBtn} variant="contained" color="primary">
                            Add Conference
                        </Button>
                    </Grid>
                </Grid>
            </form>   
        </div>
    )
}

export default AddConference
