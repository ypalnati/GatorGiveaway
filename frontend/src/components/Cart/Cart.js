import React, { useEffect, useState } from 'react';
import {Box, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Orders = () => {
    const [posts, setPosts] = useState()
    console.log("cart page here")    
    useEffect(() => {
        fetch('http://localhost:8080/orders/', {
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
      return(
        <Box sx={{ flexGrow: 1 }}>        
        
        <Grid container spacing={1}>
          {posts != null ? posts.map(function (c, i) {
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
                </Card>
            </Grid>)
          }) : <></>}
        </Grid>          
  
      </Box>
      );
}
export default Orders;