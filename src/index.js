import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios'

// For Axios Headers
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = process.env.REACT_APP_DATABASE_API_KEY;
  return config;
});

let theme = createTheme();
theme = responsiveFontSizes(theme);
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
