import * as React from "preact/compat";
import { HashRouter as BrowserRouter, Switch, Route } from "react-router-dom";
import './Main.less';

import * as firebase from 'firebase/app'

import { Navbar , Recents, Chat, Friends, Myself, Settings } from '../../components';

export default function Main() {
  const { uid } = firebase.default.auth().currentUser;
  function handleLogout() {
    firebase.default.auth().signOut();
  }

  return (
    <BrowserRouter>
      <div class="main">
        <div class="sec_navbar">
          <Navbar handleLogout={() => handleLogout()}/>
        </div>
        <div class="sec_content">
          <div class="top_navbar"></div>
          <Switch>
            <Route exact path="/main">
              <Recents />
            </Route>
            <Route path="/main/chat">
              <Chat />
            </Route>
            <Route path="/main/friends">
              <Friends />
            </Route>
            <Route path="/main/myself">
              <Myself />
            </Route>
            <Route path="/main/settings">
              <Settings />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
    
  )
};