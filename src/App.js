import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './User';
import Car from './Car';
import Navbar from './components/navbar';

function App() {

  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
          <Route path="/users" element={<User/>}/>
          <Route path="/cars" element={<Car/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
