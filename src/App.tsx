import React, { Fragment } from 'react';
import { Typography, AppBar, CssBaseline, Grid } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';





const App=()=> {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)

  }
  const handleClose = () => {
    setAnchorEl(null)
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
            <Button color='inherit' id='resource-menu' onClick={handleClick} aria-controls={open ? 'resource-menu' : undefined}
              aria-haspopup='true'
              aria-aria-expanded={open ? 'true' : undefined}><AccountCircleIcon />
            </Button>
          </Grid>


          <Menu id='resource-menu' anchorEl={anchorEl} open={open} MenuListProps={{ 'aria-labelledby': 'resource-button', }} onClose={handleClose}>
            <MenuItem onClick={handleClose}>My Profile</MenuItem>
            <MenuItem onClick={handleClose}>Wishlist</MenuItem>
            <MenuItem onClick={handleClose}>Cart</MenuItem>
            <MenuItem onClick={handleClose}>Login</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>

          </Menu>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}

export default App;
