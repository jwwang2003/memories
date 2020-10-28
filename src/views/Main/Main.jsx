import React from 'react';
import styles from './Main.module.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';

function Main() {

  return (
    <h1 onClick={() => firebase.default.auth().signOut()}>
      MAIN!
    </h1>
  )
}

export default Main;
