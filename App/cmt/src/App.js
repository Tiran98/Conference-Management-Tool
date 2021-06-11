import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import 'bootstrap/dist/css/bootstrap.min.css';


import NavBar from './component/NavBar/NavBar';
import LandingPage from './component/LandingPage/LandingPage';
//Auth
import Login from './component/UserAuth/Login';
import Registration from './component/UserAuth/Registration';
//Admin
import admin from './component/Admin/Admin'
import totalRegistrations from './component/Admin/AdminSeparatePages/TotalRegistrations'
import TotalRevenue from './component/Admin/AdminSeparatePages/TotalRevenue'
//Event Pages
import ResearchPage from './component/EventPages/ResearchPage'
import WorkShopPage from './component/EventPages/WorkShopPage'

import { Toolbar } from '@material-ui/core';

const drawerWidth = 240;
const stripePromise = loadStripe("pk_test_51J0bmhDc9iuW9EKn8IdIYtMVW1MVrATfunEe0E4FMEw3RVMjeMbW47kQWJZZ77aBrWGCG2eZ6ojw0e3rm7i5Z65y00s4ueikq3");

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    backgroundColor: '#ededed',
    // marginLeft: drawerWidth,
  },
}));

function App() {

  const [drawerState, setDrawerState] = React.useState(false);

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
        <NavBar setDrawerState={setDrawerState} drawerState={drawerState} />
          <Switch>
            <Elements stripe={stripePromise}>
                <div className={classes.content} style={{ marginLeft: drawerWidth * drawerState }}>
                  <Toolbar />
                  <Route path="/" exact component={LandingPage} />
                  <Route exact path="/register">
                      <Registration 
                        setDrawerState={setDrawerState}
                      />
                  </Route>
                  <Route exact path="/login">
                      <Login 
                        setDrawerState={setDrawerState}
                      />
                  </Route>
                  <Route path='/admin' exact component={admin}/>
                  <Route path='/adminTotReg' exact component={totalRegistrations}/>
                  <Route path='/adminTotRev' exact component={TotalRevenue}/>
                  <Route path='/research' exact component={ResearchPage}/>
                  <Route path='/workshop' exact component={WorkShopPage}/>
                </div>
           </Switch>
     </ThemeProvider>
   </Router>
  );
}


export default App;
