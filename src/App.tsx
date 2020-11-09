import * as React from "preact/compat";
import { useState, useEffect, Suspense } from "preact/compat";
import { HashRouter as BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as firebase from "firebase/app"

// import { Home, Login, Main } from './views';
//import { Home } from './views';
const Home = React.lazy(() => import('./views/Home/Home'));
const Login = React.lazy(() => import('./views/Login/Login'));
const Main = React.lazy(() => import('./views/Main/Main'));
import { ProtectedRoute }from './protectedRoute';

export default function App() {
  const [ready, setReady] = useState<true | false>(false);
  const [user, setUser] = useState<firebase.default.User | false>(false);

  useEffect(() => {
    import(/* webpackChunkName: "worker" */ './worker').then(() => {
      setReady(true);
      const auth = firebase.default.auth();
      auth.onAuthStateChanged(user => {
        if (user) {
          setUser(user)
        }
        else setUser(false)
      })
    });
  })

  return (
    <>
      <BrowserRouter>
        {user ? <Redirect to={{ pathname: '/main' }} /> : <></>}
        <Switch>
          <Suspense fallback={<Loading />}>
            <Route exact path="/" component={() => <Home />} />
            {ready ? <Route path="/login" component={() => <Login />} /> : <></> }
            {ready ? <ProtectedRoute path="/main" user={user} component={() => <Main />} fallback="/login" /> : <></> }
          </Suspense>
        </Switch>
      </BrowserRouter>
    </>
  )
};

function Loading() {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}