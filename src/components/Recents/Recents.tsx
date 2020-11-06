import * as React from 'preact/compat';
import './Recents.less';

import * as firebase from 'firebase/app';

export default function Recents() {
  const { displayName, photoURL } = firebase.default.auth().currentUser;

  return (
    <div class="recents">
      <div class="user">
        <div class="topBar">
          <img src={photoURL}></img>
        </div>
        <div class="posts">
          <div class="post">
            <div class="topBar">
              November 12, 2020 @ 1:10pm
            </div>
            <div class="content">
              Post1
            </div>
          </div>
          <div class="post">
            Post2
          </div>
          <div class="post">
            Post2
          </div>
        </div>
      </div>
    </div>
  )
}