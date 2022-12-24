import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ToastContainer } from 'react-toastify';

import PropTypes from 'prop-types';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Routes from './routes';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
     <Routes />
  </React.StrictMode>
)
