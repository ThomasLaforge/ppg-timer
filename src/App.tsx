import { hot } from 'react-hot-loader';
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from './Pages/Home/index'
import Creator from './Pages/Creator/index'
import { IconButton, Toolbar, AppBar, Drawer, List, ListItem, ListItemText, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

function App() {
const [drawerOpen, setdrawerOpen] = React.useState(false)

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setdrawerOpen(!drawerOpen)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            PPG Timer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor={'left'} open={drawerOpen} onClose={() => setdrawerOpen(false)}>
        <List>
          <ListItem button key={1}>
            <Link to='/'>Home</Link>
          </ListItem>

          <ListItem button key={0}>
            <Link to='/creator'>Creator</Link>
          </ListItem>
        </List>
      </Drawer>

      <Switch>
        <Route path="/creator">
          <Creator />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default hot(module)(App);