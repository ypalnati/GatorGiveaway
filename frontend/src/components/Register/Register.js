import './../../App.css';
import React from 'react';
import {useNavigate} from 'react-router-dom'

function Register() {
  const navigate = useNavigate();
  const callRegisterApi = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
        firstname: e.target.elements.firstname.value,
        lastname: e.target.elements.lastname.value,
        phone: e.target.elements.phone.value,
      })
    })
    .then(
      (r)=>{
        if (r.status === 200)
          navigate("/login")
      },
      (r)=>{
        console.log(r.json().then((json)=>console.log(json)))
      }
    )
  }

  return (
    <div className="App">
      <div className='App-header'>
        Sign Up
        <form onSubmit={callRegisterApi}>
        <input type='text' placeholder='Enter Username' name='username' /> <br/>
        <input type='password' placeholder='Enter Password' name='password' /> <br />
        <input type='text' placeholder='Enter FirstName' name='firstname' /> <br/>
        <input type='text' placeholder='Enter Lastname' name='lastname' /> <br/>
        <input type='tel' placeholder='Enter PhoneNumber' name='phone'/> <br/>
        <input type='submit' value='Register'/>
      </form>
      </div>
      
    </div>
  );
}

export default Register;
