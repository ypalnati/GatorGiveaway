import {Link as RouterLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Avatar, Button} from '@mui/material'

const headersData = [    
    {
      label: "About",
      href: "/aboutus",
    },            
  ];

function Header() {        
    const gatorGiveAwayHeading = (                        
        <Typography variant="h6" component="h1" fontWeight="400" sx={{px: 2}}>
          GatorGiveAway
        </Typography>
      );
    const gatorLogo = (
        <Avatar alt="gator-logo" src="/logo192.png"/>
    );
    const displayDesktop = () => {
        return <Toolbar sx={{display: "flex", justifyContent: "space-between",}}>{gatorLogo} {gatorGiveAwayHeading} 
            <div>{getMenuButtons()}</div> 
        </Toolbar>;
      };    
    const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <>
                <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
              }}
            >
              {label}
            </Button>
            <Button color="inherit" onClick={callLogoutApi}> LogOut</Button>
            </>                          
          );
        });
      }; 
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
            (r) => {
            if (r.status === 200)
                navigate("/")
            },
            (r) => {
            console.log(r)
            }
        )
    }
    // To-Do: toggle this
    let isLoggedIn = true;
    return (
        <header>
            <AppBar sx={{backgroundColor: "#bc581a"}}>{displayDesktop()} </AppBar>
        </header>
        
    )
}
export default Header;