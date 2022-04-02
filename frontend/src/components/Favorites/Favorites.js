import './../../App.css'; 
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import S3FileUpload from 'react-s3';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
const S3_BUCKET = 's3ufsebucket';
const REGION = 'us-east-2';
const ACCESS_KEY = 'AKIA5S2N4Y6VJGQX6T4T';
const SECRET_ACCESS_KEY = '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';
window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: S3_BUCKET,
  dirName: "",
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}
const style = {
  margin: 0,
  top: 'auto',
  right: 30,
  bottom: 75,
  left: 'auto',
  position: 'fixed',
}; 

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState()
  const [selectedPost, setSelectedPost] = useState()

  const [selectedFile, setSelectedFile] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
    }
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
        (r) => {
          if (r.status === 200)
            navigate("/")
        },
        (r) => {
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
        (r) => {
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )
  }

  const changeFavIcon = (c) => {
     console.log(c.isFav)
     var f = !c.isFav
     console.log(f)
    fetch('http://localhost:8080/update/' + JSON.stringify(c.ID), {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isFav : f
      })
    })
      .then(
       (r)=>{
         console.log(r);
         window.location.reload(true)
       }
      )
  }
  const callEditApi = (c) => {
   
  
    /* e.preventDefault();
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
        (r) => {
          console.log(r)
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )*/
  }

  const callCreateApi = (e) => {
    console.log("came here")
    e.preventDefault();
    handleClose();
    S3FileUpload.uploadFile(selectedFile, config)
      .then(data => {
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
          imageUrl: data["location"]
        })
      }).then(
        (r) => {
          console.log(r)
          if (r.status === 200)
            window.location.reload(false);
        },
        (r) => {
          console.log(r)
        }
      )
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetch('http://localhost:8080/read', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': '*/*'
      }
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(jsondata => {
        console.log(jsondata)
        setPosts(jsondata)
      })
  }, [])
  return (
    <Box sx={{ flexGrow: 1 }}>
    
      
      <Grid container spacing={1}>
        {posts != null ? posts.map(function (c, i) {
         if(!c.isFav) return(<></>)
         else
          return (    
            <Grid item xs={4}>
              
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={c.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {c.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Location: {c.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Dimensions: {c.dimensions}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Weight: {c.weight}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Product Age: {c.age}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Count: {c.count}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                    IsFav: {JSON.stringify(c.isFav)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Checkbox {...label} checked={c.isFav} onChange={() => changeFavIcon(c)} icon={<FavoriteBorder />} checkedIcon={<Favorite style={{color: '#E1306C'}} />} />
                  <EditIcon onClick={() => callEditApi(c.ID)} color="success" position="right"></EditIcon>
                  <DeleteIcon onClick={() => callDeleteApi(c.ID)} sx={{ color: red[800] }} position="right"></DeleteIcon>
                </CardActions>
              </Card>
          </Grid>)
        }) : <></>}
      </Grid>

    

    </Box>
        
  );
}

export default Home;