import './App.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const callLoginApi = (e) => {
    let isLoginSuccess = false
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
      })
    })
    .then(
      (r)=>{
        if (r.status === 200)
          navigate("/home")
      },
      (r)=>{
        console.log(r.json().then((json)=>console.log(json)))
      }
    )
  }

  return (
    <div className="App">
      <div className='App-header'>
        Login
        <form onSubmit={callLoginApi}>
        <input type='text' placeholder='Enter username' name='username' /> <br/>
        <input type='password' placeholder='Enter password' name='password' /> <br />
        <input type='submit' value='login'/>
      </form>
      </div>
      
    </div>
  );
}

export default App;
