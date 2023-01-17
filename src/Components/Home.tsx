import React, { useState, useEffect } from 'react'
import { Autocomplete, Box, Button, Container, Grid, IconButton, ImageList, TextField, Typography } from '@mui/material';
import Navbar from './Navbar';
import sizeConfig from '../Config/sizeConfig';
import ColorConfig from '../Config/ColorConfig';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import axios from 'axios';


const Home=()=> {
  let newProductList: any = [];
  const [productList, setProductList] = useState([]);
  const [newproductList, setNewProductList]: any = useState([])
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {

    axios.get(`http://localhost:8080/product/all`)
      .then((res) => setProductList(res.data))
      .catch(err => console.log(err))
    console.log("errr");

  }, []);

  useEffect(() => {
    console.log(productList); 
    productList.map((item: any) => {
      if (!newproductList.includes(item.productCategory)) {
        setNewProductList([...newproductList, item.productCategory]);
      }
    });
    console.log(newproductList);
  });
  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSort('asc');
    if (category == '') {
      axios.get('http://localhost:8080/product/all/?sort=asc')
        .then(response => {
          setProductList(response.data);
        })
    }
    else {
      axios.get('http://localhost:8080/product/all/?sort=asc&category='+category)
        .then(response => {
          setProductList(response.data);
        })
    }
  };
  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSort('desc');
    if (category == '') {
      axios.get('http://localhost:8080/product/all/?sort=desc')
        .then(response => {
          setProductList(response.data);
        })
    }
    else {
      axios.get('http://localhost:8080/product/all/?sort=desc&category='+category)
        .then(response => {
          setProductList(response.data);
        })
    }
  };
  const handleChange = (category: any) => {
    if (category != null) {
      setCategory(category)
      axios.get(`http://localhost:8080/product/all/?category=`+category)
        .then(response => {
          setProductList(response.data);
        })
    } else {
      setCategory('')
      axios.get('http://localhost:8080/product/all')
        .then(response => {
          setProductList(response.data);
        })
        
        
    }
  };
  
  return (
    <Box>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{
            width: sizeConfig.sidebar.width,
            flexShrink: 0,
            backgroundColor: ColorConfig.sidebar.color
          }}
        >
          <Grid>
            <Typography variant='h6' sx={{ fontWeight: "bold" }}>
              Filter
              <Container>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={newproductList.map((item: any) => (
                    item
                  ))}
                  onChange={(event, value) => handleChange(value)}
                  sx={{ width: 200 }}
                  renderInput={(params) => <TextField {...params} label="Select Category" />}
                />
              </Container>
            </Typography>
          </Grid>


        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% -${sizeConfig.sidebar.width})`,
            minHeight: "100vh",
            backgroundColor: ColorConfig.mainBg
          }}
        >
           <Typography variant='h6'>
                    Sort By
                  </Typography>
          <Box>
            <Grid>
              <Button onClick={handleSort}>
                <CurrencyRupeeIcon />
                Low to High
              </Button>
              <Button onClick={changeSort}>
                <CurrencyRupeeIcon />
                High to Low
              </Button>
            </Grid>
          </Box>
          <Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, width: 950 }}>
            <ImageList sx={{ width: 1600 }} cols={3} rowHeight={160}>
              {productList.map((product: any) => (
                <Box p={3}>
                  <Box height={'280px'} border={'1px solid #e8e8e8'}>
                    <Box component={'img'} src={product.productImg} width={'100%'} height={'100%'} sx={{ objectFit: 'contain', objectPosition: 'center' }} />
                  </Box>
                  <Typography variant='h6' sx={{ fontWeight: "bold" }}>
                    {product.productName}
                  </Typography>
                  <Typography variant='body2'>
                    {product.productDesc}
                  </Typography>
                  <Typography variant='h5' sx={{ fontWeight: "bold", color: "#ff6d00" }}>
                    ₹ {product.productPrice}/-
                  </Typography>
                  <Box px={2}>
                    <Button fullWidth variant={'outlined'}>Add Cart</Button>
                  </Box>
                </Box>
              ))}
            </ImageList>
          </Box>
          {/* <SortbarOnly/> */}
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Home;

// function useEffect(arg0: () => void, arg1: never[]) {
//   throw new Error('Function not implemented.');
// }
