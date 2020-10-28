import React, { useState } from 'react';
import styles from './Login.module.css';
import { HashRouter as BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import googleIcon from './images/google.svg';
import facebookIcon from './images/facebook.svg';
import weixinIcon from './images/weixin.png';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      'margin-bottom': theme.spacing(1),
      width: '100%',
    },
  },
}));

function authWithGoogle() {
  preAuth();
  const provider = new firebase.default.auth.GoogleAuthProvider();
  firebase.default.auth().signInWithPopup(provider).then(function() {
    postAuth(true);
  }).catch(function(err) {
    postAuth(false, err);
  })
}

/**
 * Helper function, no params
 * Simply disables the signin window to disable the main window
 */
function preAuth() {
  document.getElementById('login').className = `${styles.login} ${styles.disabled}`;
}

/**
 * Helper function
 * @param {*} success - true if there were no error, otherwise false
 * @param {*} err - if error, what was it?
 */
function postAuth(success, err) {
  // if (success) toast.success(`Authentication Success!`, {position: toast.POSITION.TOP_CENTER});
  // else toast.warn(`${err}`, {position: toast.POSITION.TOP_CENTER});
  document.getElementById('login').className = `${styles.login}`;
}

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function signInWithEmail() {
    preAuth();
    firebase.default.auth().signInWithEmailAndPassword(email, password).then(function() {
      postAuth(true);
    }).catch(function(err) {
      postAuth(false, err);
    })
  }

  function createWithEmail() {
    preAuth();
    firebase.default.auth().createUserWithEmailAndPassword(email, password).then(function() {
      postAuth(true);
    }).catch(function(err) {
      postAuth(false, err);
    })
  }

  return (
    <BrowserRouter>
      <div className={styles.container}>
          <div id="login" className={styles.login}> 
            <Switch>
              <Route exact path="/login">
                <Template
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  component={() => <Main />} />
              </Route>
              <Route exact path="/login/register">
                <Template
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  component={() => <Register/> } />
              </Route>
              <Route exact path="/login/recover">
                <Recover 
                  email={email}
                  setEmail={setEmail}
                  history={history}/>
              </Route>
            </Switch>
          </div>
      </div>
    </BrowserRouter>
  )

  function Main() {
    return (
      <>
        <div className={styles.miniLink}><Link to="/login/register">Register with email</Link></div>
        <div className={`${styles.button}`} onClick={() => signInWithEmail()}>Login</div>
        <div className={styles.miniLink}><Link to="/login/recover">Forgot password</Link></div> 
      </>
    )
  }
  
  function Register() {
    return (
      <>
        <div className={styles.miniLink}><Link to="/login">Login with email</Link></div>
        <div className={`${styles.button}`} onClick={() => createWithEmail()}>Register</div>
      </>
    )
  }

  function Recover(props) {
    return(
      <>
        <div className={`${styles.miniLink} ${styles.back}`} onClick={() => props.history.goBack()}>Back</div>
        <form className={`${useStyles().root} ${styles.inputs}`} autoComplete="off">
          <TextField id="outlined-basic" label="Email" variant="outlined" value={props.email} onChange={e => props.setEmail(e.target.value)}/>
        </form>
        <div className={`${styles.button}`}>Recover</div>
      </>
    )
  }
}

function Template(props) {
  const Component = props.component;
  return (
    <>
      <div className={`${styles.miniLink} ${styles.back}`}><Link to="/">Home</Link></div>
      <div className={styles.thirdParty}>
        <div className={`${styles.button} ${styles.auth} ${styles.google_btn}`} onClick={() => authWithGoogle(firebase)}><img alt="" src={googleIcon}></img>Google</div>
        <div className={`${styles.button} ${styles.auth} ${styles.facebook_btn} ${styles.disabled}`}><img alt="" src={facebookIcon}></img>Facebook</div>
        <div className={`${styles.button} ${styles.auth} ${styles.weixin_btn} ${styles.disabled}`}><img alt="" src={weixinIcon}></img>WeChat</div>
      </div>
      <form className={`${useStyles().root} ${styles.inputs}`} autoComplete="off">
        <TextField id="outlined-basic" label="Email" variant="outlined" type="email" value={props.email} onChange={e => props.setEmail(e.target.value)}/>
        <TextField id="outlined-basic" label="Password" variant="outlined" type="password" value={props.password} onChange={e => props.setPassword(e.target.value)}/>
      </form>
      <Component></Component>
    </>
  )
}

export default Login;
