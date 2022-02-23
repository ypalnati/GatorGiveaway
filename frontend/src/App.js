import './App.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'

function App() {
  const [registerErrors, setRegisterErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState({})
  const navigate = useNavigate();
  const callLoginApi = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/login', {
      method: 'POST',
      credentials: 'include',
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
        else if (r.status === 401) {
          console.log(r);
          r.json().then((json)=>{
            console.log(json);
            let error = json["error"];
            console.log(error);
            let newLoginErrors = {...loginErrors}
            newLoginErrors['username'] = error
            setLoginErrors(newLoginErrors)
          })
        }
      },
     
      (r)=>{
        r.json().then((rr)=>{
          let error = rr.json();
            let newLoginErrors = {...loginErrors}
            newLoginErrors['server'] = error
            setRegisterErrors(newLoginErrors)
        })
      }
    )
  }
  const callRegisterApi = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: e.target.elements.username.value,
        password: e.target.elements.password.value,
        firstname: e.target.elements.firstname.value,
        lastname: e.target.elements.lastname.value,
        email: e.target.elements.email.value,
        phone: e.target.elements.phone.value,
      })
    })
    .then(
      (r)=>{
        if (r.status === 200) {
          navigate("/")
        }
        else if (r.status === 409) {
          r.json().then((json)=>{
            let error = json["error"];
            console.log(error);
            let newregisterErrors = {...registerErrors}
            newregisterErrors['username'] = error
            setRegisterErrors(newregisterErrors)
          })
        }
          else {
            r.json().then((json)=>{
              let error = json["error"];
              console.log(error);
              let newregisterErrors = {...registerErrors}
              newregisterErrors['server'] = error
              setRegisterErrors(newregisterErrors)
            })
          }
        
      },
      (r)=>{
        r.json().then((rr)=>{
          let error = rr.json();
            let newregisterErrors = {...registerErrors}
            newregisterErrors['server'] = error
            setRegisterErrors(newregisterErrors)
        })
      }
    )
  }
  useEffect(() => {
    window.loginload()
  }, []);
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/home">
            <img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
            Gator Giveaway
        </a>
      </nav>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <img className='img-fluid' src='/2gators.jfif' alt=''/>
          </div>
          <div className='col'>
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-login-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Login</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-register-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Register</button>
              </li>
            </ul>
            <div className="tab-content col-6" id="pills-tabContent">
              <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-login-tab">
                <form onSubmit={callLoginApi}>
                {"server" in loginErrors?<div className='text-danger'>{loginErrors.server}</div>:''}
                {"username" in loginErrors?<div className='text-danger'>{loginErrors.username}</div>:''}
                    <input className="form-control" type='text' placeholder='Enter username' name='username' required /> <br/>
                    <input className="form-control" type='password' placeholder='Enter password' name='password' required /> <br />
                    <input className='btn' style={{backgroundColor: "red"}} type='submit' value='Submit'/>
                </form>
              </div>
              <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-register-tab">
              <form onSubmit={callRegisterApi}>
                {"server" in registerErrors?<div className='text-danger'>{registerErrors.server}</div>:''}
                {"username" in registerErrors?<div className='text-danger'>{registerErrors.username}</div>:''}
                <input className="form-control" type='text' placeholder='Enter Username' name='username' required/> <br/>
                <input className="form-control" type='password' placeholder='Enter Password' name='password' required/> <br />
                <input className="form-control" type='text' placeholder='Enter FirstName' name='firstname' required/> <br/>
                <input className="form-control" type='text' placeholder='Enter Lastname' name='lastname' required/> <br/>
                <input className="form-control" type='email' placeholder='Enter Email' name='email' required/> <br/>
                <input className="form-control" type='tel' placeholder='Enter Ph' name='phone' required/> <br/>
                <input className='btn' style={{backgroundColor: "#f88745"}} type='submit' value='Submit'/>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
