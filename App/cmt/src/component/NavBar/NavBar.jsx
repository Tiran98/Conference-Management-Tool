import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Menu, MenuItem, Badge, Modal } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import PresentToAllTwoToneIcon from '@material-ui/icons/PresentToAllTwoTone';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import GetAppIcon from '@material-ui/icons/GetApp';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HelpIcon from '@material-ui/icons/Help';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';

import logo from '../../assets/logo.png';
import useStyles from './styles';

const options = ["hi"];
  
const ITEM_HEIGHT = 48;

const NavBar = ({ setDrawerState, drawerState }) => {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const isFirstRender = useRef(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = useState(["hi"]);
    const totalItems = notifications.length;
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const [userToken, setUserToken] = useState(JSON.stringify(localStorage.getItem('userToken')));
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [userType, setUserType] = useState(JSON.parse(localStorage.getItem('userType')));
    const [logoutbtn, setlogoutbtn] = useState(false);

    const logout = () => {
        localStorage.clear();
        setUserToken(null);
        history.push('/login');
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
        setNotifications([]);
    };

    const handleDrawerOpen = () => {
        setDrawerState(true);
    };
    
    const handleDrawerClose = () => {
        setDrawerState(false);
    };

    const handleToken = () => {
        setUserToken(JSON.stringify(localStorage.getItem('userToken')));
    };

    useEffect(() => {
        // if (isFirstRender.current) {
        //     isFirstRender.current = false // toggle flag after first render/mounting
        //     return;
        // }

        setUserToken(JSON.stringify(localStorage.getItem('userToken')));
        setUserType(JSON.parse(localStorage.getItem('userType')));
        setUserProfile(JSON.parse(localStorage.getItem('profile')));

        if(userToken === null || userToken === "null") 
            setlogoutbtn(false);
        else 
            setlogoutbtn(true);
    
    }, [location]);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {drawerState ? 
                        <IconButton
                            color="primary"
                            onClick={handleDrawerClose}
                        >
                            <CloseIcon />
                        </IconButton> :
                        <IconButton
                        color="primary"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    }
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="primary">
                        <img src={logo} height="70px" className={classes.image} /> Conference Management Tool
                    </Typography>
                    <div className={classes.grow} />
                    {/* <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <Badge badgeContent={totalItems} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton> */}
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
                        {logoutbtn ? (
                            <div className={classes.profile}>
                                <div className={classes.profileType}>
                                    <Typography className={classes.userName} variant="h6" color="primary">{userProfile.firstName} {userProfile.lastName}</Typography>
                                    {userType == "attendee" ? 
                                        <Typography className={classes.userType} variant="caption" color="primary">Attendee</Typography>: 
                                    userType == "researcher" ? 
                                        <Typography className={classes.userType} variant="caption" color="primary">Researcher</Typography>:
                                    userType == "workshop_presenter" ? 
                                        <Typography className={classes.userType} variant="caption" color="primary">Workshop Presenter</Typography>:
                                    userProfile.userType == "admin" ?
                                        <Typography className={classes.userType} variant="caption" color="primary">Admin</Typography>: null
                                    }
                                    
                                </div>
                                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <>
                                <Button component={Link} to="/login" variant="outlined" className={classes.button} color="primary">Sign in</Button>
                                <Button component={Link} to="/register" variant="contained" className={classes.button} color="primary">Sign up</Button>
                            </>
                        )}
                         
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="persistent" anchor="left" open={drawerState} className={classes.drawer} classes={{paper: classes.drawerPaper,}}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    {logoutbtn ?
                    <> 
                        <List>
                            <ListItem component={Link} to={'/research'} button >
                                <ListItemIcon ><FindInPageIcon /></ListItemIcon>
                                <ListItemText primary="Research Presentation" />
                            </ListItem>
                            <ListItem component={Link} to={'/workshop'} button>
                                <ListItemIcon><PresentToAllTwoToneIcon /></ListItemIcon>
                                    <ListItemText primary="Workshops" />
                            </ListItem>
                            <ListItem component={Link} to ="/addConf" button>
                                <ListItemIcon><RecordVoiceOverIcon /></ListItemIcon>
                                <ListItemText primary="Keynote Speakers" />
                            </ListItem>
                            <ListItem component={Link} to ="/profile" button>
                                <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItem>
                        </List>
                        <Divider />
                    </> : null }
                    <List>
                        <ListItem component={Link} to ="/" button >
                            <ListItemIcon ><HomeIcon /></ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
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
        </div>
    )
}

export default NavBar;