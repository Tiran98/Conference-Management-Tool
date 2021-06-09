import { Typography, Paper, Grid, Divider, Card, CardContent, CardMedia, IconButton  } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PlaceIcon from '@material-ui/icons/Place';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React from 'react';

import useStyles from './styles';
import conferenceLogo from '../../assets/logo192.png';
import avatar from '../../assets/avatar.jpg';

const LandingPage = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paperTitle}>
                <Grid container spacing={2} style={{ alignItems: 'center' }}>
                    <Grid item xs={10}>
                        <Typography variant="h4" className={classes.conferenceTitle}>
                            International Conference on Application Frameworks – ICAF
                        </Typography>
                        <Typography variant="h6" className={classes.conferenceVenue}>
                            by Sri Lanka Institute of Information Technology
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.logo}>
                        <img src={conferenceLogo} height="100" />
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className={classes.paperKeynotes}>
                        <Typography variant="h6">Keynote Speakers</Typography>
                        <Divider />
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <img src={avatar} className={classes.avaterImage} />
                            <div>
                                <Typography variant="h6">
                                    Addy Osmani
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Engineering Manager at Google 
                                </Typography>
                            </div>
                        </Paper>
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <img src="https://pbs.twimg.com/profile_images/1090714620275245056/HS9xcEDk_400x400.jpg" className={classes.avaterImage} />
                            <div>
                                <Typography variant="h6">
                                    John Resig
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Creator and Lead Developer of the JQuery
                                </Typography>
                            </div>
                        </Paper>
                        
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paperDetails}>
                        <Typography variant="h6">Conference Details</Typography>
                        <Divider />
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <DateRangeIcon style={{ marginRight: 10 }} />
                            <Typography variant="subtitle1"> Date : 12/12/2021</Typography>
                        </Paper>
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <AccessTimeIcon style={{ marginRight: 10 }} />
                            <Typography variant="subtitle1"> Time : 12:00 PM</Typography>
                        </Paper>
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <PlaceIcon style={{ marginRight: 10 }} />
                            <Typography variant="subtitle1"> Venue : Sri Lanka Institute of Information Technology</Typography>
                        </Paper>
                        <Paper variant="outlined" className={classes.paperDetail}>
                            <LibraryBooksIcon style={{ marginRight: 10 }} />
                            <Typography variant="subtitle1"> Topic : Support collaborative development of JavaScript and web technologies</Typography>
                        </Paper>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default LandingPage;
