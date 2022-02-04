import './../../App.css';
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
            r.json().then((json)=>console.log(json))
            if (r.status === 200)
                navigate("/")
          },
          (r)=>{
            console.log(r.json().then((json)=>console.log(json)))
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
            <>
            {posts != null? posts.map(function(c, i){
              return (<div key={i}>
                <div className="card">
                  <div className="card-body">
                    Name: {c.name} <br />
                    Description: {c.description} <br />
                    Item location: {c.location} <br />
                    Item Dimensions: {c.dimensions} <br />
                    Item weight: {c.weight} <br />
                    Period of usage: {c.age} <br />
                    Number of Items: {c.count} <br />
                    <button onClick={()=>setSelectedPost(c.ID)} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPost">
                      Edit Post
                    </button>
                  </div>
                </div>
              </div>)
            }): <></>}
            </>
            

            {/* Edit Modal  */}
            <div className="modal fade" id="editPost" tabindex="-1" aria-labelledby="editPostLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="editPostLabel">Edit Post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
              
                <form onSubmit={callEditApi}>
                  <div className="mb-3">
                    <label for="nameIput" className="form-label">Name</label>
                    <input className="form-control" type='text' placeholder='Enter Name' name='name' />
                  </div>
                  <div className="mb-3">
                    <label for="DescriptionIput" className="form-label">Description</label>
                    <input className="form-control" type='text' placeholder='Enter Description' name='Description' />
                  </div>
                  <div className="mb-3">
                    <label for="LocationIput" className="form-label">Location</label>
                    <input className="form-control" type='text' placeholder='Enter Location' name='Location' />
                </div>
                  <div className="mb-3">
                    <label for="DimensionsIput" className="form-label">Dimensions</label>
                    <input className="form-control" type='text' placeholder='Enter Dimensions' name='Dimensions' />
                  </div>

                  <div className="mb-3">
                    <label for="WeightIput" className="form-label">Weight</label>
                    <input className="form-control" type='text' placeholder='Enter Weight' name='Weight' /> 
                  </div>

                  <div className="mb-3">
                    <label for="AgeIput" className="form-label">Age</label>
                    <input className="form-control" type='text' placeholder='Enter Age' name='Age' /> 
                  </div>

                  <div className="mb-3">
                    <label for="CountIput" className="form-label">Count</label>
                    <input className="form-control" type='text' placeholder='Enter Count' name='Count' /> 
                  </div>

                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Home;