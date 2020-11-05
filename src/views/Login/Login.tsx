import * as React from "preact/compat";
import { useState } from "preact/compat";
import { HashRouter as BrowserRouter, Link, Switch, Route } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

import './Login.less';

import * as firebase from 'firebase/app';

type handleEmailProps = {
  email: string,
  password: string
}

function googleSignIn() {
  preAuth();
  const provider = new firebase.default.auth.GoogleAuthProvider();
  firebase.default.auth().signInWithPopup(provider).then(() => {
    postAuth();
  }).catch(() => {
    postAuth();
  })
}

function handleLogin({ email, password }: handleEmailProps) {
  preAuth();
  firebase.default.auth().signInWithEmailAndPassword(email, password).then(() => {
    postAuth();
  }).catch(() => {
    postAuth();
  });
}

function handleRegister({ email, password }: handleEmailProps) {
  preAuth();
  firebase.default.auth().createUserWithEmailAndPassword(email, password).then(() => {
    postAuth();
  }).catch(() => {
    postAuth();
  });
}

function handleRecover() {

}

function handleFinalize() {

}

function preAuth() {
  document.getElementById('login').className = 'container disabled';
}

function postAuth() {
  document.getElementById('login').className = 'container';
}

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [displayName, setDisplayName] = useState<string>('');
  const [userID, setUserID] = useState<string>('');

  return (
    <BrowserRouter>
      <div class="login">
        <div id="login" class="container">
          <Switch>
            <Route exact path="/login">
              <Main email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={() => handleLogin({email, password})}/>
            </Route>
            <Route exact path="/login/register">
              <Register email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleRegister={() => handleRegister({email, password})}/>
            </Route>
            <Route exact path="/login/recover">
              <Recover email={email} setEmail={setEmail} handleRecover={() => handleRecover()} />
            </Route>
            <Route exact path="/login/setup">
              <Setup displayName={displayName} setDisplayName={setDisplayName} userID={userID} setUserID={setUserID} handleFinalize={() => handleFinalize()} />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
};

type MainProps = {
  email: string,
  password: string,
  setEmail: React.StateUpdater<string>,
  setPassword: React.StateUpdater<string>,
  handleLogin: Function,
}

function Main({email, password, setEmail, setPassword, handleLogin}: MainProps) {
  return (
    <>
      <div class="miniLink back"><Link to="/">Home</Link></div>
      <div class="thirdParty">
        <div class="button auth google_btn" onClick={() => googleSignIn()}><GoogleIcon />Google</div>
      </div>
      <TextField className="input" id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <TextField className="input" id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <div class="miniLink"><Link to="/login/register">Register with email</Link></div>
      <div class="button" onClick={() => handleLogin()}>Login</div>
      <div class="miniLink"><Link to="/login/recover">Forgot password</Link></div>
    </>
  )
}

type RegisterProps = {
  email: string,
  password: string,
  setEmail: React.StateUpdater<string>,
  setPassword: React.StateUpdater<string>,
  handleRegister: Function,
}

function Register({email, password, setEmail, setPassword, handleRegister}: RegisterProps) {
  return (
    <>
      <TextField className="input" id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <TextField className="input" id="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      <div class="miniLink"><Link to="/login">Login with email</Link></div>
      <div class="button" onClick={() => handleRegister()}>Register</div>
    </>
  )
}

type RecoverProps = {
  email: string,
  setEmail: React.StateUpdater<string>,
  handleRecover: Function,
}

function Recover({email, setEmail, handleRecover}: RecoverProps) {
  return (
    <>
      <div class="miniLink back"><Link to="/login">Login</Link></div>
      <TextField className="input" id="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      <div class="button" onClick={() => handleRecover()}>Recover</div>
    </>
  )
}

type SetupProps = {
  displayName: string,
  setDisplayName: React.StateUpdater<string>,
  userID: string,
  setUserID: React.StateUpdater<string>,
  handleFinalize: Function
}

function Setup({displayName, setDisplayName, userID, setUserID, handleFinalize}: SetupProps) {
  return (
    <>
      <TextField className="input" id="outlined-basic" label="Display Name" variant="outlined" type="name" value={displayName} onChange={e => setDisplayName(e.target.value)}/>
      <TextField className="input" id="outlined-basic" label="User ID" variant="outlined" type="user" value={userID} onChange={e => setUserID(e.target.value)}/>
      <div class="button" onClick={() => handleFinalize()}>Finalize</div>
    </>
  )
}

function GoogleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="480px" height="480px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
  )
}