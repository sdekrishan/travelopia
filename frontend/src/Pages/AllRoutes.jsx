import {Routes, Route} from 'react-router-dom';
import React from "react";
import FormPage from './FormPage';
import Dashboard from './Dashboard';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<FormPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='*' element={<h1>404 page</h1>}/>
      {/* <Route path='/' element={}/> */}
    </Routes>
  );
};

export default AllRoutes;
