import React from "react";
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

export default function Footer() {
  return (
    <div>
      <CssBaseline />      
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: "#01529b",
        }}
      >
        <Container maxWidth="sm">
          <Link href="/aboutus" variant="body2" color="#FFFEFE" sx={{ml:2, px: 2, align: 'left'}}>About Us</Link>
          <Link id="contactus" href="/contactus" variant="body2" color="#FFFEFE" sx={{mr:2, px: 2, align: 'right'}}>Contact Us</Link>
          <Copyright sx={{mr:2, align: 'center'}}/>
        </Container>
      </Box>

    </div>
          
  );
}