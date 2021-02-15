import { hot } from 'react-hot-loader';
import React, { useState } from "react";

import {
  Switch,
  Route,
  Link,
  HashRouter,
} from "react-router-dom";

import Home from './Pages/Home/index'
import Creator from './Pages/Creator/index'
import { IconButton, Toolbar, AppBar, Drawer, List, ListItem, ListItemText, Typography, ListItemIcon } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import Executor from './Pages/Executor';

import firebase from 'firebase/app';
import 'firebase/firestore';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyD1nWhY6OLe_JJo1vVFP9bScyPDTDwDKyQ",
    authDomain: "ppg-timer-db.firebaseapp.com",
    projectId: "ppg-timer-db"
  });
}

const api = firebase.firestore();
export const trainingsAPI = api.collection("trainings")


export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: 'rgba(5,15,62,0.94)',
    },
    secondary: {
      main: '#fad936',
    },
  },
});

function App() {
  const [drawerOpen, setdrawerOpen] = React.useState(false)

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="secondary" aria-label="menu" onClick={() => setdrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography color='secondary' variant="h6" >
              PPG Timer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer anchor={'left'} open={drawerOpen} onClose={() => setdrawerOpen(false)}>
          <List>
            <ListItem button key={0}>
                <Link to='/'>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary={'Home'} />
                </Link>
            </ListItem>

            <ListItem button key={1}>
              <Link to='/creator'>
                <ListItemText primary={'Creator'} />
              </Link>
            </ListItem>
          </List>
        </Drawer>

        <Switch>
          <Route path="/creator">
            <Creator />
          </Route>
          <Route path='/executor'>
            <Executor />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </ThemeProvider>
    </HashRouter>
  );
}

export default hot(module)(App);