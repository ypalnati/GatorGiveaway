import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Register/Register'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Register />}></Route>
        <Route path="/login" element={<App />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
