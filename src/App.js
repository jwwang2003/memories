import React, { useState } from 'react';

import { HashRouter as BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Views
import { Home, Login , Main } from './views'

import ProtectedRoute from './ProtectedRoute';

// Firebase libraries
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

var firebaseConfig = {
  apiKey: "AIzaSyD1_91Hn-8_BMIdkv75zkGCT0VtFYe5xFQ",
  authDomain: "jiuijiujiu.firebaseapp.com",
  databaseURL: "https://jiuijiujiu.firebaseio.com",
  projectId: "jiuijiujiu",
  storageBucket: "jiuijiujiu.appspot.com",
  messagingSenderId: "319949768473",
  appId: "1:319949768473:web:51af58b3975e56718b6788",
  measurementId: "G-K8VLV0RR4D"
};
// Initialize Firebase
firebase.default.initializeApp(firebaseConfig);
const auth = firebase.default.auth();

function App() {
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      {user ? <Redirect to={{ pathname: '/main' }} /> : <Redirect to={{ pathname: '/' }} />}
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/login" component={() => <Login />} />
        <ProtectedRoute path="/main" isAuth={user} component={() => <Main />} fallBackLink="/login" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;