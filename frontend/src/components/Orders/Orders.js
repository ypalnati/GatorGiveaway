import React, { useEffect, useState } from 'react';
import {Box, Grid, Card, CardMedia, CardContent, Typography} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { CollectionsOutlined } from '@material-ui/icons';
const Orders = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
      console.log("orders page here")    
      fetch('http://13.71.87.168:8080/allOrders', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Accept': '/'
          }
        })
          .then(response => {
            console.log('remoSsss')
            console.log(response)
          })
          .then(jsondata => {
            console.log('remoS')
            console.log(jsondata)
            console.log(jsondata['Orders'])
            setOrders(jsondata['Orders'])
          })
    },[])
    
    return(
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {orders != null && orders.length > 0 ? orders.map((c, i) => { console.log(c['posts']); return (
            c['posts'] != null && c['posts'].length > 0 ? c['posts'].map((p, j) => { return (
              <Grid item>
                <Card sx={{ maxWidth: 345 }} key={j}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Product Id: {p.productId}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Count: {p.count}
                    </Typography>
                  </CardContent>                  
                </Card>
              </Grid>
          )}):<>No Items Found</> )}) : <Grid key={0} item xs={4}><Typography gutterBottom variant="h5" component="div">No Orders Placed</Typography></Grid>}
        </Grid>
    </Box>
    );    
      
      
}
export default Orders;