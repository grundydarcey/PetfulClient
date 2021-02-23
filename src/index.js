import './index.css'
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root/Root'
import App from './App/app';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);

