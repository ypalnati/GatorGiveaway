import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'

function Login() {
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
              setLoginErrors(newLoginErrors)
          })
        }
      )
    }
    
    useEffect(() => {
      // window.loginload()
    }, []);
    return (
      <div>
      
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              <img className='img-fluid' src='/2gators.jfif' alt=''/>
            </div>
            <div className='col'>
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                
               
              </ul>
              <div className="tab-content col-6" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-login-tab">
                  <form onSubmit={callLoginApi}>
                  {"server" in loginErrors?<div className='text-danger'>{loginErrors.server}</div>:''}
                  {"username" in loginErrors?<div className='text-danger'>{loginErrors.username}</div>:''}
                      <input className="form-control" type='text' placeholder='Enter username' name='username' required /> <br/>
                      <input className="form-control" type='password' placeholder='Enter password' name='password' required /> <br />
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

export default Login;