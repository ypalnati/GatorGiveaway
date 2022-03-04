//import {Link as RouterLink} from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, Avatar, Button} from '@mui/material'


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
        return <Toolbar>{gatorLogo} {gatorGiveAwayHeading} {getMenuButtons}</Toolbar>;
      };

    const getMenuButtons = (
        <Button key="home" color="inherit" to="/home" component="RouterLink"></Button>        
    ); 
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
            <AppBar sx={{backgroundColor: "#bc581a"}}>{displayDesktop()}</AppBar>
        </header>
        // <div>
        //     <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
        //     <p>   </p>
        //             <a className="navbar-brand" href="/home">
        //         <img src="/logo192.png" width="30" height="30" className="d-inline-block align-top" alt="" />
        //               Gator Giveaway
        //         </a>
    
        //         <div className="container">
                
        //             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
        //                 aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
        //                 <span className="oi oi-menu"></span> Menu
        //             </button>
        //             <div className="collapse navbar-collapse" id="ftco-nav">
        //                 <ul className="navbar-nav ml-auto">
        //                     <li className="nav-item active">
        //                         <Link className="nav-link" to="/home">Home</Link>
        //                     </li>

        //                     {isLoggedIn ?
        //                     <>
        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/support">About</Link>
        //                     </li>

        //                     <li className="nav-item">
        //                         <Link className="nav-link" to="/register">My Account</Link>                                
        //                     </li>
                            
                            
        //                     <form className="form-inline" onSubmit={callLogoutApi}>
        //                             <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Logout</button>
        //                         </form>
                            
        //                      </> :

        //                     <>
        //                         <li className="nav-item">
        //                         <Link className="nav-link" to="/login">Login</Link>
        //                         </li> 

        //                         <li className="nav-item">
        //                         <Link className="nav-link" to="/register">Register</Link>
        //                         </li>
                            
        //                     </>}
        //                 </ul>
        //             </div>
        //         </div>
        //     </nav>
        // </div>
    )
}

export default Header;