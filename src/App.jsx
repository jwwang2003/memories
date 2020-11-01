import React, { useState } from 'react';
import { h } from 'preact';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home, Login, Main } from './views';
import ProtectedRoute from './ProtectedRoute';

function App () {
  const [user, setUser] = useState('');

  import(/* webpackChunkName: "worker" */ './worker').then(module => {
    // do something with the module?
     module.worker();
     const auth = global.firebase.auth();
     auth.onAuthStateChanged(auth => {
      if (auth) {
        setUser(auth);
      }
      else {
        setUser('');
      }
    });
  })
  
  return (
    <BrowserRouter>
      {user ? <Redirect to={{ pathname: '/main' }} /> : <> </>}
      <Switch>
        <Route exact path="/" component={() => <Home />} />
        <Route path="/login" component={() => <Login />} />
        <ProtectedRoute path="/main" user={user} component={() => <Main />} fallBackLink="/login" />
      </Switch>
    </BrowserRouter>
  )
}

export default App;