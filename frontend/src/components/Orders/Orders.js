import React, { useEffect, useState } from 'react';
import {Box, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
const Orders = () => {
    const [orders, setOrders] = useState()
    console.log("orders page here")    
    fetch('http://13.71.87.168/allOrders/', {
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
            setOrders(jsondata)
          })
          return(
            <Box sx={{ flexGrow: 1 }}>        
            
            <Grid container spacing={1}>
              {orders != null ? orders.map(function (c, i) {
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
                        
                      </CardContent>                  
                    </Card>
                </Grid>)
              }) : <></>}
            </Grid>          
      
          </Box>
          );    
      
      
}
export default Orders;