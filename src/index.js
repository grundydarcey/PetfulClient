import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/app';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById('root')
);

