import {Link as RouterLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Avatar, Button, IconButton} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cookies from 'universal-cookie';

const headersData = [    
    {
      label: "About",
      href: "/aboutus",
      favLabel: "Favorites",
      favLink: "/favorites",
      ordersLabel: "Orders",
      ordersLink: "/orders"
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
    const cookies = new Cookies();   
      const mainsession = cookies.get('mainsession');
    const displayDesktop = () => {
        return <Toolbar sx={{display: "flex", justifyContent: "space-between",}}>{gatorLogo} {gatorGiveAwayHeading} 
            {mainsession != null? <div>{getMenuButtons()}</div> :<div></div>}
        </Toolbar>;
      };
      
    const getMenuButtons = () => {
        return headersData.map(({ordersLabel, ordersLink, label, href, favLabel, favLink }) => {
          return (
            <>
              	<Button
              {...{
                key: ordersLabel,
                color: "inherit",
                to: ordersLink,
                component: RouterLink,
              }}
            >
              {ordersLabel}
            </Button>

               <Button
              {...{
                key: favLabel,
                color: "inherit",
                to: favLink,
                component: RouterLink,
              }}
            >
              {favLabel}
            </Button>
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
        <header className='header'>
            <AppBar sx={{backgroundColor: "#bc581a"}}>{displayDesktop()} </AppBar>
        </header>
        
    )
}
export default Header;