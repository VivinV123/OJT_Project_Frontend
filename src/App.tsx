import React,{Fragment} from 'react';
import Navbar from './Components/Navbar';
import Welcome from './Components/Welcome';
import {Routes, Route} from "react-router-dom"
import { Container } from '@mui/material';


const App=()=> {
  return (
 
 
    <Fragment>
    <Navbar/>
    </Fragment>
 
    // <Fragment>
    //   <Routes>
    //     <Route path='/' element={<Navbar/>} />
    //     <Route path='/welcome' element={<Welcome/>} />
    //   </Routes>
    
    // </Fragment>
  );
}

export default App;
