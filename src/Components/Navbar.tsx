import React, { Fragment, useEffect } from 'react';
import { Typography, AppBar, CssBaseline, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react'
import axios from 'axios';
import Divider from '@mui/material/Divider';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import Box from '@mui/material/Box';
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'

const clientId = "895281300735-ce2q5upa6a4n8blu9mgtme5h9gah818t.apps.googleusercontent.com"

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
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""

      })
    };
    gapi.load('client:auth2', start);
    console.log("ssss",gapi);
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

  const onSuccess = (res: any) => {
    setToken(res.tokenId)
    const data = {
      userToken: res.tokenId
    }


    axios.get(`http://localhost:8080/user/all`).then((response) => {
      const userList = [...response.data]
      var count = 0;
      for (const key in userList) {
        if ((userList[key].userEmail) === (res.profileObj.email)) {
          setName(userList[key].userName);
          setImg(userList[key].userPicture)
          count = 1;
          alert("User already exist")
        }
      }

      if (count === 0) {
        axios.post(`http://localhost:8080/user/user_token`, data)
        alert("Welcome user")
      }

    })
  }

  const onFailure = (res: any) => {
    console.log("Unable to Login");
  }
  const onLogout = () => {
    setImg(undefined);
    setName(undefined)
    setToken(undefined)
    console.log("Logout Successfully");
    setLoggout(false)
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
              <Box component="img" sx={{ ...commonStyles, borderRadius: '50%' }} src={img} />
            </Button>
          </Grid>
          <Dialog
            open={loggin}
            onClose={() => setLoggin(false)}
            aria-labelledby='dialog-title'
          >

            <DialogContent>
              <GoogleLogin
                clientId={clientId}
                buttonText="Login With Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true} />
            </DialogContent>
          </Dialog>

          <Dialog
            open={loggout}
            onClose={() => setLoggout(false)}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'
          >

            <DialogContent>
              <DialogContentText>
                Are you Sure to Logout?
              </DialogContentText>
              <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onLogout}
              />
            </DialogContent>
          </Dialog>
          <Menu id='resource-menu' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'resource-button', }} onClose={handleClose} PaperProps={{ sx: { width: '150px' } }}>
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Wishlist</MenuItem>
            <MenuItem onClick={handleClose}>Cart</MenuItem>
            <Divider sx={{ my: 0.5 }} />
            {token ? <MenuItem onClick={() => setLoggout(true)}>Logout</MenuItem> :
              <MenuItem onClick={() => setLoggin(true)}>Login</MenuItem>}
          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default Navbar;
