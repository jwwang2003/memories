import React, { useState } from 'react';
import { h } from 'preact';
import { BrowserRouter, Switch, Route, Link, useHistory } from 'react-router-dom';
import styles from './Login.module.css';
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import googleIcon from './images/google.svg';
import facebookIcon from './images/facebook.svg';
import weixinIcon from './images/weixin.png';

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
  const provider = new global.firebase.auth.GoogleAuthProvider();
  global.firebase.auth().signInWithPopup(provider).then(function() {
    postAuth(true);
  }).catch(function(err) {
    postAuth(false, err);
  })
}

function signInWithEmail(email, password) {
  preAuth();
  global.firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
    postAuth(true);
  }).catch(function(err) {
    postAuth(false, err);
  })
}

function createWithEmail(email, password) {
  preAuth();
  global.firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
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

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <div id="login" className={styles.login}> 
          <div className={`${styles.miniLink} ${styles.back}`} onClick={() => {history.push('/')}}>Home</div>
          <div className={styles.thirdParty}>
            <div className={`${styles.button} ${styles.auth} ${styles.google_btn}`} onClick={() => authWithGoogle()}><img alt="" src={googleIcon}></img>Google</div>
            <div className={`${styles.button} ${styles.auth} ${styles.facebook_btn} ${styles.disabled}`}><img alt="" src={facebookIcon}></img>Facebook</div>
            <div className={`${styles.button} ${styles.auth} ${styles.weixin_btn} ${styles.disabled}`}><img alt="" src={weixinIcon}></img>WeChat</div>
          </div>
          <Switch>
            <Route exact path="/login">
              <Main email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
            </Route>
            <Route  exact path="/login/register">
              <Register email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
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
}

function Main(props) {
  const { email, setEmail, password, setPassword } = props;
  return (
    <>
      <form className={`${useStyles().root} ${styles.inputs}`} autoComplete="off">
        <TextField id="filled-basic" label="Email" variant="filled" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <TextField id="filled-basic" label="Password" variant="filled" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </form>
      <div className={styles.miniLink}><Link to="/login/register">Register with email</Link></div>
      <div className={`${styles.button}`} onClick={() => signInWithEmail(email, password)}>Login</div>
      <div className={styles.miniLink}><Link to="/login/recover">Forgot password</Link></div> 
    </>
  )
}

function Register(props) {
  const { email, setEmail, password, setPassword } = props;
  return (
    <>
      <form className={`${useStyles().root} ${styles.inputs}`} autoComplete="off">
        <TextField id="filled-basic" label="Email" variant="filled" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <TextField id="filled-basic" label="Password" variant="filled" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </form>
      <div className={styles.miniLink}><Link to="/login">Login with email</Link></div>
      <div className={`${styles.button}`} onClick={() => createWithEmail(email, password)}>Register</div>
    </>
  )
}

function Recover(props) {
  const { history, email, setEmail } = props;
  return(
    <>
      <div className={`${styles.miniLink} ${styles.back}`}><a onClick={() => history.goBack()}>Back</a></div>
      <form className={`${useStyles().root} ${styles.inputs}`} autoComplete="off">
        <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => setEmail(e.target.value)}/>
      </form>
      <div className={`${styles.button}`}>Recover</div>
    </>
  )
}

export default Login;