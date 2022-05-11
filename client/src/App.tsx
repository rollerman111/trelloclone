// @ts-nocheck
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Routes from './routes'
import axios from 'axios';

axios.interceptors.request.use(async function (config) {
  const token = localStorage.getItem('messenger-token');
  config.headers['x-access-token'] = token;
  return config;
});


function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
