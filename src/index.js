import './index.css'
import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root/Root'

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>, 
  document.getElementById('root')
);
