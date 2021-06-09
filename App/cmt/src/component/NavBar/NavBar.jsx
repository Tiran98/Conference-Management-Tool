import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem, Badge } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PresentToAllTwoToneIcon from '@material-ui/icons/PresentToAllTwoTone';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import GetAppIcon from '@material-ui/icons/GetApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import HelpIcon from '@material-ui/icons/Help';

import logo from '../../assets/logo.png';
import useStyles from './styles';
import LandingPage from '../LandingPage/LandingPage';

const options = ["hi"];
  
const ITEM_HEIGHT = 48;

const NavBar = () => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = useState(["hi"]);
    const totalItems = notifications.length;
    const open = Boolean(anchorEl);

    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        // dispatch({ type: 'LOGOUT' });
    
        history.push('/');
    
        // setUser(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
        setNotifications([]);
    };

    useEffect(() => {
        // const token = user?.token;
        // setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    return (
        <div className={classes.root}>
             <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="primary">
                        <img src={logo} height="70px" className={classes.image} /> Conference Management Tool
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <Badge badgeContent={totalItems} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        elevation={3}
                        getContentAnchorEl={null}
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        PaperProps={{
                        style: {
                            maxHeight: ITEM_HEIGHT * 4.5,
                            width: '40ch',
                        },
                        }}
                    >
                        {!notifications.length ? 
                        <span>
                            <MenuItem onClick={handleClose}>
                                <Typography variant="body2" color="primary">
                                    There are no notifications to show.
                                </Typography>
                            </MenuItem>
                        </span> :
                        <>
                            {notifications.map((option) => (
                            <MenuItem key={option} onClick={handleClose}>
                                {option}
                            </MenuItem>
                            ))}
                        </>
                        }
                    </Menu>
                    <div>
                        {/* {user ? (
                            <div className={classes.profile}>
                                <Typography className={classes.userName} variant="h6" color="primary">{user?.result.name}</Typography>
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button component={Link} to="/user-auth" variant="outlined" className={classes.button} color="primary">Login / Register</Button>
                        )} */}
                         <Button component={Link} to="/user-auth" variant="outlined" className={classes.button} color="primary">Login / Register</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className={classes.drawer} classes={{paper: classes.drawerPaper,}}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                <List>
                    <ListItem button >
                        <ListItemIcon ><FindInPageIcon /></ListItemIcon>
                        <ListItemText primary="Research Presentation" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><PresentToAllTwoToneIcon /></ListItemIcon>
                        <ListItemText primary="Workshops" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><RecordVoiceOverIcon /></ListItemIcon>
                        <ListItemText primary="Keynote Speakers" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button >
                        <ListItemIcon ><GetAppIcon /></ListItemIcon>
                        <ListItemText primary="Download Templates" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                        <ListItemText primary="Partners" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><HelpIcon /></ListItemIcon>
                        <ListItemText primary="Support Page" />
                    </ListItem>
                </List>
                <div className={classes.bottomPush}>
                    <Typography variant="caption" color="inherit" align="right" className={classes.footer}>
                        © 2021 BeeCon.com.  All rights reserved.
                    </Typography>
                </div>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar />
                <Router>
                    <Switch>
                        <Route path="/" exact component={LandingPage} />
                    </Switch>
                </Router>
            </main>
        </div>
    )
}

export default NavBar;