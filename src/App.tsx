import * as React from "preact/compat";
import { useState, useEffect } from "preact/compat";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import * as firebase from "firebase/app"

import { Home, Login, Main } from './views';
import { ProtectedRoute }from './protectedRoute';

export default function App() {
  const [ready, setReady] = useState<true | false>(false);
  const [user, setUser] = useState<firebase.default.User | false>(false);
  
  useEffect(() => {
    import(/* webpackChunkName: "worker" */ './worker').then(() => {
      setReady(true);
      const auth = firebase.default.auth();
      auth.onAuthStateChanged(user => {
        if (user) setUser(user)
        else setUser(false)
      })
    })
  })

  return (
    <>
      <BrowserRouter>
        {user ? <Redirect to={{ pathname: '/main' }} /> : <></>}
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          {ready ? <Route path="/login" component={() => <Login />} /> : <></> }
          {ready ? <ProtectedRoute path="/main" user={user} component={() => <Main />} fallback="/login" /> : <></> }
        </Switch>
      </BrowserRouter>
    </>
  )
};