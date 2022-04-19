import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Header from './components/Header/Header'
import Register from './components/Register/Register'
import Login  from './components/Login/Login'
import Footer from './components/Footer/Footer'
import AboutUs from './components/AboutUs/AboutUs'
import ContactUs from './components/ContactUs/ContactUs'
import Favorite from './components/Favorites/Favorites'
import Orders from './components/Orders/Orders'

const App = () => {

  return (
    <div title='App Root'>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header/>
          <div id="main-container">          
            <Routes>
              <Route path="/" exact element={<Login />} />
              <Route path="/home" exact element={<Home />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} /> 
              <Route path="/aboutus" exact element={<AboutUs />} />               
              <Route path="/contactus" exact element={<ContactUs />} />
              <Route path="/favorites" exact element={<Favorite />} />
              <Route path="/orders" exact element={<Orders />} />
            </Routes>          
          </div>           
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App