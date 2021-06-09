import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './component/NavBar/NavBar';
import admin from './component/Admin/Admin'
import LandingPage from './component/LandingPage/LandingPage';
import Registration from './component/UserAuth/Registration';

import { Toolbar } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#ededed',
    marginLeft: drawerWidth,
  },
}));

function App() {

  const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#171717',
        },
        secondary: {
            light: '#0066ff',
            main: '#FFB101',
            contrastText: '#000000',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    spacing: 8,
  });

  const classes = useStyles();

  return (
   <Router>
      <ThemeProvider theme={theme}>
        <NavBar />
          <Switch>
            <main className={classes.content}>
                <Toolbar />
                <Route path="/" exact component={LandingPage} />
                <Route path="/register" exact component={Registration} />
                <Route path='/admin' exact component={admin}/>
            </main>
           </Switch>
     </ThemeProvider>
   </Router>
  );
}


export default App;
