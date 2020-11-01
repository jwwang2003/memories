import React from 'react';
import { h } from 'preact';

import ReactDOM from 'react-dom';
import App from './App.jsx';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import './index.css';

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);