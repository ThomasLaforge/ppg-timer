import { hot } from 'react-hot-loader';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Pages/Home/index'

function App() {
  return (
    <Router>
        <Switch>
          {/* <Route path="/about">
            <About />
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default hot(module)(App);