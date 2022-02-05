import './../../App.css';
import Modal from './../Modal/Modal';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState()
    const [selectedPost, setSelectedPost] = useState()
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
            if (r.status === 200)
                navigate("/")
          },
          (r)=>{
            console.log(r)
          }
        )
      }
      const callDeleteApi = (c) => {

        fetch('http://localhost:8080/delete/' + c, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Accept': '*/*'
          }
        })
        .then(
          (r)=>{
            if (r.status === 200)
              window.location.reload(false);
          },
          (r)=>{
            console.log(r)
          }
        )
      }
      const callEditApi = (e) => {
        e.preventDefault();
        console.log(e.target.elements);
        fetch('http://localhost:8080/update/' + selectedPost, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: e.target.elements.name.value,
            description: e.target.elements.Description.value,
            location: e.target.elements.Location.value,
            dimensions: e.target.elements.Dimensions.value,
            weight: parseInt(e.target.elements.Weight.value),
            age: parseInt(e.target.elements.Age.value),
            count: parseInt(e.target.elements.Count.value),
          })
        })
        .then(
          (r)=>{
            console.log(r)
            if (r.status === 200)
            window.location.reload(false);
          },
          (r)=>{
            console.log(r)
          }
        )
      }

      const callCreateApi = (e) => {
        e.preventDefault();
        console.log(e.target.elements);
        fetch('http://localhost:8080/create', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: e.target.elements.name.value,
            description: e.target.elements.Description.value,
            location: e.target.elements.Location.value,
            dimensions: e.target.elements.Dimensions.value,
            weight: parseInt(e.target.elements.Weight.value),
            age: parseInt(e.target.elements.Age.value),
            count: parseInt(e.target.elements.Count.value),
          })
        })
        .then(
          (r)=>{
            console.log(r)
            if (r.status === 200)
              window.location.reload(false);
          },
          (r)=>{
            console.log(r)
          }
        )
      }

      useEffect(() => {
        fetch('http://localhost:8080/read',{
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': '*/*'
          }
        })
        .then(response => {console.log(response) 
          return response.json()})
        .then(jsondata => {
          console.log(jsondata)
          setPosts(jsondata)
        })
      }, [])
    return (
        <div className='container'>
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/home">
                <img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                Gator Giveaway
            </a>
            <form className="form-inline" onSubmit={callLogoutApi}>
                <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
            </form>
            </nav>
            <div class="d-flex flex-row-reverse bd-highlight">
            <div class="p-2 bd-highlight">
            <form className="form-inline" onSubmit={callCreateApi}>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createPost">
                  Add Post
                </button>
            </form>
            </div>
            </div>
            <div className='row' style={{width: "50rem"}}>
            {posts != null? posts.map(function(c, i){
              return (<div key={i} className="col">
                <div className="card">
                <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text></svg>
                  <div className="card-body">
                    <h5 class="card-title">{c.name}</h5>
                    <p class="card-text">{c.description}</p> <br />
                    <i class="far fa-location">{c.location}</i> <br />
                    <i class="far fa-ruler">{c.dimensions}</i> <br />
                    <i class="far fa-weight">{c.weight}</i> <br />
                    <i class="far fa-child" aria-hidden="true">{c.age}</i> <br />
                    <i class="far fa-layer-group">{c.count}</i> <br />
                    
                    <button onClick={()=>setSelectedPost(c.ID)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPost">
                      Edit Post
                    </button>
                    <button onClick={()=>callDeleteApi(c.ID)} value="Delete" className="btn btn-danger">
                    Delete Post
                    </button>
                  </div>
                </div>
              </div>)
            }): <></>}
            </div>
            

            {/* Edit Modal  */}
            <Modal Id="editPost" method={callEditApi}/>

            {/* Add Modal  */}
            <Modal Id="createPost" method={callCreateApi}/>
            


        </div>
    );
}

export default Home;