import React, { useState } from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {AppBar,Tabs,Tab,Typography,Box,Card,CardActions,CardContent,Button,Grid, TextareaAutosize} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
}
  

const AdminEditorReq = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const handleChangeIndex = (index) => {
        setValue(index);
    };
    
    return (
        <div>
            <div>
                <h2 style={{fontSize:25}}>Editor Requests</h2>
            </div>
            <div className={classes.Reqroot}>
                <AppBar position="static" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    >
                    <Tab label="Pending" {...a11yProps(0)} />
                    <Tab label="Accepted" {...a11yProps(1)} />
                    <Tab label="Declined" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}>
                    <TabPanel value={value} index={0} dir={theme.direction} style={{maxHeight:420,overflowY:'auto',marginBottom:20}}>
                        <div>
                            <Card className={classes.Cardroot}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Request Id: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                #34526 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{textAlign:'right'}} className={classes.Cardtitle}>
                                                Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                22/09/2021
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextareaAutosize
                                        rowsMax={4}
                                        aria-label="maximum height"
                                        defaultValue="Date Updated"
                                        readOnly
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                            variant="contained"
                                            color="#00ff00"
                                            className={classes.buttonDone}
                                            startIcon={<DoneIcon />}>
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{marginLeft:-12,marginTop:-30}}>
                                            <CardActions>
                                                <Button style={{fontSize:14,padding:5}} class="btn btn-outline-primary" size="small">See Changes</Button>
                                            </CardActions>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                            variant="contained"
                                            className={classes.buttonDecline}
                                            startIcon={<DoneIcon />}>
                                                Decline
                                            </Button>
                                        </Grid>   
                                    </Grid>
                                </CardContent>                              
                            </Card>
                        </div>
                        <br></br>
                        <div>
                            <Card className={classes.Cardroot}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Request Id: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                #34526 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{textAlign:'right'}} className={classes.Cardtitle}>
                                                Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                22/09/2021
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextareaAutosize
                                        rowsMax={4}
                                        aria-label="maximum height"
                                        defaultValue="Date Updated"
                                        readOnly
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                            variant="contained"
                                            color="#00ff00"
                                            className={classes.buttonDone}
                                            startIcon={<DoneIcon />}>
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{marginLeft:-12,marginTop:-30}}>
                                            <CardActions>
                                                <Button style={{fontSize:14,padding:5}} class="btn btn-outline-primary" size="small">See Changes</Button>
                                            </CardActions>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                            variant="contained"
                                            className={classes.buttonDecline}
                                            startIcon={<DoneIcon />}>
                                                Decline
                                            </Button>
                                        </Grid>   
                                    </Grid>
                                </CardContent>                              
                            </Card>
                        </div>
                        <br></br>
                        <div>
                            <Card className={classes.Cardroot}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Request Id: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                #34526 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{textAlign:'right'}} className={classes.Cardtitle}>
                                                Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                22/09/2021
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextareaAutosize
                                        rowsMax={4}
                                        aria-label="maximum height"
                                        defaultValue="Date Updated"
                                        readOnly
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                            variant="contained"
                                            color="#00ff00"
                                            className={classes.buttonDone}
                                            startIcon={<DoneIcon />}>
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{marginLeft:-12,marginTop:-30}}>
                                            <CardActions>
                                                <Button style={{fontSize:14,padding:5}} class="btn btn-outline-primary" size="small">See Changes</Button>
                                            </CardActions>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                            variant="contained"
                                            className={classes.buttonDecline}
                                            startIcon={<DoneIcon />}>
                                                Decline
                                            </Button>
                                        </Grid>   
                                    </Grid>
                                </CardContent>                              
                            </Card>
                        </div>
                        <br></br>
                        <div>
                            <Card className={classes.Cardroot}>
                                <CardContent>
                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Request Id: 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                #34526 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography style={{textAlign:'right'}} className={classes.Cardtitle}>
                                                Date:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                22/09/2021
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextareaAutosize
                                        rowsMax={4}
                                        aria-label="maximum height"
                                        defaultValue="Date Updated"
                                        readOnly
                                        />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Typography className={classes.Cardtitle}>
                                                Changes:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Button
                                            variant="contained"
                                            color="#00ff00"
                                            className={classes.buttonDone}
                                            startIcon={<DoneIcon />}>
                                                Accept
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} style={{marginLeft:-12,marginTop:-30}}>
                                            <CardActions>
                                                <Button style={{fontSize:14,padding:5}} class="btn btn-outline-primary" size="small">See Changes</Button>
                                            </CardActions>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                            variant="contained"
                                            className={classes.buttonDecline}
                                            startIcon={<DoneIcon />}>
                                                Decline
                                            </Button>
                                        </Grid>   
                                    </Grid>
                                </CardContent>                              
                            </Card>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                    </TabPanel>
                </SwipeableViews>
            </div>
        </div>
    )
}

export default AdminEditorReq
