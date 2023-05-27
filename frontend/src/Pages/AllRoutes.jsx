import {Routes, Route} from 'react-router-dom';
import React from "react";
import FormPage from './FormPage';
import Dashboard from './Dashboard';
import NotFound from './NotFound';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<FormPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
  );
};

export default AllRoutes;
