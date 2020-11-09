import * as React from 'preact/compat';
import { Link } from 'react-router-dom';

import './Navbar.less';

type NavbarProps = {
  handleLogout: Function
}

var prev: number = 0;
function tabWorker(where: number) {
  for (let i = 0; i < 5; ++i) {
    if (i === where) {
      document.getElementById(`indicator-${prev}`).className = "";
      document.getElementById(`indicator-${where}`).className = "indicator";
      prev = where;
      break;
    }
  }
}

export default function Navbar({ handleLogout }: NavbarProps) {
  return (
    <div class="navbar">
      <Link to="/main" className="item" onClick={() => tabWorker(0)}>
        <div id="indicator-0" class="indicator"></div>
        <RecentsIcon />
        <div>Recents</div>
      </Link>
      <Link to="/main/chat" className="item" onClick={() => tabWorker(1)}>
        <div id="indicator-1"></div>
        <ChatIcon />
        <div>Chat</div>
      </Link>
      <Link to="/main/friends" className="item" onClick={() => tabWorker(2)}>
        <div id="indicator-2"></div>
        <FriendsIcon />
        <div>Friends</div>
      </Link>
      <Link to="/main/myself" className="item" onClick={() => tabWorker(3)}>
        <div id="indicator-3"></div>
        <MyselfIcon />
        <div>Myself</div>  
      </Link>
      <Link to="/main/settings" className="item" onClick={() => tabWorker(4)}>
        <div id="indicator-4"></div>
        <SettingsIcon />
        <div>Settings</div>
      </Link>
      <div className="item exit" onClick={() => handleLogout()}>
        <ExitIcon />
        <div>Logout</div>
      </div>
    </div>
  )
}

function RecentsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 5v14h2V5h-2zm-4 14h2V5h-2v14zM14 5H2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1zM8 7.75c1.24 0 2.25 1.01 2.25 2.25S9.24 12.25 8 12.25 5.75 11.24 5.75 10 6.76 7.75 8 7.75zM12.5 17h-9v-.75c0-1.5 3-2.25 4.5-2.25s4.5.75 4.5 2.25V17z" fill="currentColor" class="primary"/></svg>
  )
}

function ChatIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M20 4H4v13.17L5.17 16H20V4zm-6 10H6v-2h8v2zm4-3H6V9h12v2zm0-3H6V6h12v2z" opacity=".3" fill="currentColor" class="secondary"/>
    <path
        d="M20 18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14zm-16-.83V4h16v12H5.17L4 17.17zM6 12h8v2H6zm0-3h12v2H6zm0-3h12v2H6z" fill="currentColor" class="primary"/>
    </svg>
  )
}

function FriendsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
        d="M20 6H4v12h16V6zm-8 1c1.38 0 2.5 1.12 2.5 2.5S13.38 12 12 12s-2.5-1.12-2.5-2.5S10.62 7 12 7zm5 10H7v-1.01C7 13.9 10.31 13 12 13s5 .9 5 2.99V17z"
        opacity=".3" fill="currentColor" class="secondary"/>
    <path
        d="M4 20h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2zM4 6h16v12H4V6zm0-6h16v2H4zm0 22h16v2H4zm8-10c1.38 0 2.5-1.12 2.5-2.5S13.38 7 12 7 9.5 8.12 9.5 9.5 10.62 12 12 12zm0-3.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4.5c-1.69 0-5 .9-5 2.99V17h10v-1.01C17 13.9 13.69 13 12 13zm-3.19 2.5c.61-.52 2.03-1 3.19-1 1.17 0 2.59.48 3.2 1H8.81z" fill="currentColor" class="primary"/>
    </svg>
  )
}

function MyselfIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
        d="M5 19h14V5H5v14zm7-13c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM6 16.47c0-2.5 3.97-3.58 6-3.58s6 1.08 6 3.58V18H6v-1.53z"
        opacity=".3" fill="currentColor" class="secondary"/>
    <path
        d="M12 12c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3zm0-4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7-5H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-1-2.53c0-2.5-3.97-3.58-6-3.58s-6 1.08-6 3.58V18h12v-1.53zM8.31 16c.69-.56 2.38-1.12 3.69-1.12s3.01.56 3.69 1.12H8.31z" fill="currentColor" class="primary"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path
            d="M5 19h14V5H5v14zm2.5-7c0-.2.02-.39.04-.58l-1.27-.99c-.11-.09-.15-.26-.07-.39l1.2-2.07c.08-.13.23-.18.37-.13l1.49.6c.31-.25.66-.44 1.02-.6l.22-1.59c.03-.14.15-.25.3-.25h2.4c.15 0 .27.11.3.25l.22 1.59c.37.15.7.35 1.01.59l1.49-.6c.14-.05.29 0 .37.13l1.2 2.07c.08.13.04.29-.07.39l-1.27.99c.03.2.04.39.04.59 0 .2-.02.39-.04.58l1.27.99c.11.09.15.26.07.39l-1.2 2.07c-.08.13-.23.18-.37.13l-1.49-.6c-.31.24-.65.44-1.01.59l-.22 1.59c-.03.15-.15.26-.3.26h-2.4c-.15 0-.27-.11-.3-.25l-.22-1.59c-.37-.15-.7-.35-1.01-.59l-1.49.6c-.14.05-.29 0-.37-.13l-1.2-2.07c-.08-.13-.04-.29.07-.39l1.27-.99c-.03-.2-.05-.39-.05-.59z"
            opacity=".3" fill="currentColor" class="secondary"/>
        <path
            d="M6.21 13.97l1.2 2.07c.08.13.23.18.37.13l1.49-.6c.31.24.64.44 1.01.59l.22 1.59c.03.14.15.25.3.25h2.4c.15 0 .27-.11.3-.26l.22-1.59c.36-.15.7-.35 1.01-.59l1.49.6c.14.05.29 0 .37-.13l1.2-2.07c.08-.13.04-.29-.07-.39l-1.27-.99c.03-.19.04-.39.04-.58 0-.2-.02-.39-.04-.59l1.27-.99c.11-.09.15-.26.07-.39l-1.2-2.07c-.08-.13-.23-.18-.37-.13l-1.49.6c-.31-.24-.64-.44-1.01-.59l-.22-1.59c-.03-.14-.15-.25-.3-.25h-2.4c-.15 0-.27.11-.3.26l-.22 1.59c-.36.15-.71.34-1.01.58l-1.49-.6c-.14-.05-.29 0-.37.13l-1.2 2.07c-.08.13-.04.29.07.39l1.27.99c-.03.2-.05.39-.05.59 0 .2.02.39.04.59l-1.27.99c-.11.1-.14.26-.06.39zM12 10.29c.94 0 1.71.77 1.71 1.71s-.77 1.71-1.71 1.71-1.71-.77-1.71-1.71.77-1.71 1.71-1.71zM19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm0 16H5V5h14v14z" fill="currentColor" class="primary"/>
    </svg>
  )
}

function ExitIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="48px" height="48px">
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </svg>
  )
}
