import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import GetAllUsers from './components/getAllUsers';
import User from './User';
import Car from './Car';
import Navbar from './components/navbar';

function App() {

  return (
    <>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/users" element={<User/>}/>
          <Route path="/cars" element={<Car/>}/>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
