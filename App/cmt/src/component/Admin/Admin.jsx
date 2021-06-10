import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {InputLabel,MenuItem,FormControl,Select,NativeSelect,InputBase} from '@material-ui/core';
import TotalCards from './TotalCards'
import AdminTabPanel from './AdminTabPanal'
import AdminEditorReq from './AdminEditorReq'
import useStyles from './styles';
import { Grid } from '@material-ui/core'

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
}))(InputBase);

const Admin = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('')
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <div className={classes.adminTitle}>
                        <h1 className={classes.adminTitleh}>Admin</h1>&nbsp;&nbsp;<h1 className={classes.adminTitleh1}>Dashboard</h1>
                    </div>
                </Grid>
                <Grid item xs={6} style={{marginTop:-20}}>
                    <div>
                    <FormControl className={classes.margin} style={{width:450,marginLeft:80,marginTop:30}}>
                        <InputLabel htmlFor="demo-customized-select-native">Select Your Conference</InputLabel>
                        <NativeSelect
                        id="demo-customized-select-native"
                        value={age}
                        placeholder="Select Your Conference"
                        onChange={handleChange}
                        input={<BootstrapInput />}>
                            <option aria-label="Select Your Conference" value="">Select Your Conference</option>
                            <option value={10}>Ten</option>
                            <option value={20}>Twenty</option>
                            <option value={30}>Thirty</option>
                        </NativeSelect>
                    </FormControl>
                    </div>
                </Grid>
                <br></br>
                <Grid item xs={6}>
                    <TotalCards />
                    <br></br>
                    <Grid item xs={6}>
                        <div>
                            <h2 style={{marginLeft:30}}>User Summary</h2>
                        </div>
                    </Grid>
                    <br></br>
                    <Grid item xs={6}>
                        <AdminTabPanel />
                    </Grid>
                </Grid>
                <Grid item xs={6} style={{paddingLeft:100}}>
                    <AdminEditorReq />
                </Grid>    
            </Grid>        
                 
        </div>
    )
}

export default Admin