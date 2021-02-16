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
import { mainColor } from './definitions';

if (firebase.apps.length === 0) {
  firebase.initializeApp({
    apiKey: "AIzaSyD1nWhY6OLe_JJo1vVFP9bScyPDTDwDKyQ",
    authDomain: "ppg-timer-db.firebaseapp.com",
    projectId: "ppg-timer-db"
  });
}

const api = firebase.firestore();
export const trainingsAPI = api.collection("trainings")

console.log('mainColor', mainColor)

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: mainColor
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