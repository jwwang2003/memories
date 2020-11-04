import * as React from "preact/compat";
import { useState, useEffect } from "preact/compat";

import * as firebase from 'firebase/app';

export default function Login() {
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');

  function handleLogin() {
    
  }

  function handleRegister() {

  }

  return (
    <>
      <h1>Login?</h1>
      <button onClick={() => googleSignIn()}>Login with google</button>
    </>
  )
};

function emailSignIn() {

}

function emailCreate() {
  
}

function googleSignIn() {
  const provider = new firebase.default.auth.GoogleAuthProvider();
  firebase.default.auth().signInWithPopup(provider);
}