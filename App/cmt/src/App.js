import React, { useState, useEffect } from 'react';
import{BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import admin from './component/Admin/Admin'

function App() {
  return(
      <Router>
          <Switch>
              <Route path='/admin' exact component={admin}/>
          </Switch>
      </Router>
  )
}

export default App;
