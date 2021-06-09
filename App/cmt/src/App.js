import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import NavBar from './component/NavBar/NavBar';
import LandingPage from './component/LandingPage/LandingPage';
import { Toolbar } from '@material-ui/core';

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

  return (
   <Router>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Toolbar />
        {/* <Switch>
            <Route path="/" exact component={LandingPage} />
        </Switch> */}
     </ThemeProvider>
   </Router>
  );
}


export default App;
