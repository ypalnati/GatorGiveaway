import './../../App.css';
import React from 'react';
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const callLogoutApi = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/logout', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': '*/*'
          }
        })
        .then(
          (r)=>{
            r.json().then((json)=>console.log(json))
            if (r.status === 200)
                navigate("/")
          },
          (r)=>{
            console.log(r.json().then((json)=>console.log(json)))
          }
        )
      }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/home">
                <img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                Gator Giveaway
            </a>
            <form className="form-inline my-2 my-lg-0" onSubmit={callLogoutApi}>
                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
            </form>
            </nav>
            
        </div>
    );
}

export default Home;