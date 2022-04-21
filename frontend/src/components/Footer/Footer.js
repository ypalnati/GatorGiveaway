import React from "react";
import {useNavigate} from 'react-router-dom';
import {CssBaseline, Box, Typography, Container, Link} from '@mui/material';

import './Footer.css'
import { textAlign } from "@mui/system";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/raghusaripalli/GatorGiveaway">
        Gator GiveAway Git
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const footerStyle = {
      margin : 0,
      padding: 1,
      position: 'fixed',
      bgcolor: '#01529b',
      bottom: 0,
      left: 0,
      width: '100%',
  }
export default function Footer() {
  const navigate = useNavigate();
  return (
    <div>
      <CssBaseline />      
      <Box
        component="footer"
        sx={footerStyle}
      >
        <Container maxWidth="sm">
          <Link onClick={()=>navigate("/aboutus")} href="" variant="body2" color="#FFFEFE" sx={{ml:2, px: 2, align: 'left'}}>About Us</Link>
          <Link id="contactus" onClick={()=>navigate("/contactus")} href="" variant="body2" color="#FFFEFE" sx={{mr:2, px: 2, align: 'right'}}>Contact Us</Link>
          <Copyright sx={{mr:2, align: 'center'}}/>
        </Container>
      </Box>

    </div>
          
  );
}