import React, { Fragment, useEffect } from 'react';
import { Typography, AppBar, CssBaseline, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState} from 'react'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import Link from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'


const clientId="895281300735-ce2q5upa6a4n8blu9mgtme5h9gah818t.apps.googleusercontent.com"
const Navbar = () => {
  const [name, setName] = useState()
  const [img, setImg] = useState()
  const [loggin, setLoggin] = useState(false)
  const [loggout, setLoggout] = useState(false)
  const [token, setToken] = useState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

  }
  
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleProfile = () => {
    setAnchorEl(null)
  }
useEffect(()=>{
  function start(){
    gapi.client.init({
      clientId:clientId,
      scope: ""
      
    })
    setToken(gapi.auth.getToken().access_token)
    console.log("token",token);
    console.log("gapi",gapi);
    // console.log("auth",auth.getToken());
    // console.log("token",token);
    // console.log("token",token);

  };
  gapi.load('client:auth2',start);
  
}
);


  const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
    width: '2rem',
    height: '2rem',
  };

  const onSuccess=(res: any)=>{
    
    console.log("Login Sucess ! Current user :",res.profileObj);
    console.log("id",res.profileObj.name);
  
    console.log("url",res.profileObj.imageUrl);
    setName(res.profileObj.name)
    setImg(res.profileObj.imageUrl)
    console.log("img",img);
  }
  // useEffect(() => {
  //   const test = 5;
  //   // console.log(test); // return 5
  //   setToken(gapi.auth.getToken().access_token)
  //   setTimeout(() => {
  //     console.log("token",token);
  //   }, 2000);
  // }, []);

  const onFailure=(res: any)=>{
    console.log("Login Sucess ! Current user :",res);
   
    
  }
  const onLogout=()=>{
    console.log("Logout Successfully");
    sessionStorage.clear();
    localStorage.clear();
  }

  
  return (

    <Fragment>
      <CssBaseline />
      <AppBar position='relative'>
        <Toolbar>
   
          <AddShoppingCartIcon />
          <Typography variant='h6'>
            Ecommerce   
          </Typography>
      

          <Grid container justifyContent="flex-end">
          <Typography variant='h6'>
          {name} 
          </Typography>
          
            
            <Button color='inherit' id='resource-menu' onClick={handleClick} aria-controls={open ? 'resource-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}>
                     <Box component="img" sx={{ ...commonStyles, borderRadius: '50%' }}  src={img}/>
                {/* <AccountCircleIcon /> */}
            </Button>
          </Grid>
          <Dialog
            open={loggin}
            onClose={() => setLoggin(false)}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
          //   PaperProps={{ sx: { width: "20%", height: "20%" } }
          // }
            >
          
            <DialogContent>
                {/* <Button autoFocus onClick={() => setLoggin(false)} href="/Welcome"> Login With Google</Button> */}
                <GoogleLogin
                clientId={clientId}
                buttonText="Login With Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}/>
            </DialogContent>
          </Dialog>

          <Dialog
            open={loggout}
            onClose={() => setLoggout(false)}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
          //   PaperProps={{ sx: { width: "20%", height: "20%" } }
          // }
            >
          
            <DialogContent>
              <DialogContentText>
                Are you Sure to Logout?
              </DialogContentText>
                {/* <Button autoFocus onClick={() => setLoggin(false)} href="/Welcome"> Login With Google</Button> */}
                <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onLogout}
            
            
            
            ></GoogleLogout>
            </DialogContent>
          </Dialog>
          <Menu id='resource-menu' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'resource-button', }} onClose={handleClose} PaperProps={{ sx: { width: '150px' } }}>
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Wishlist</MenuItem>
            <MenuItem onClick={handleClose}>Cart</MenuItem>
            <Divider sx={{ my: 0.5 }} />
            {token?  <MenuItem onClick={() => setLoggout(true)}>Logout</MenuItem>:
            <MenuItem onClick={() => setLoggin(true)}>Login</MenuItem> }
           
           
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Navbar;
