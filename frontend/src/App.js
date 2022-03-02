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

const App = () => {

  return (
    <div>
      <BrowserRouter>
       <Header></Header>
     
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} /> 
          <Route path="/aboutus" exact element={<AboutUs />} /> 
          <Route path="/contactus" exact element={<ContactUs />} />
        </Routes>

        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App