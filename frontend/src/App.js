import './style/index.scss';
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Forum from './pages/Forum';
import Profileid from './pages/Profileid';
import React, { useEffect } from 'react';
import Admin from './pages/Admin'

function App() {
  

  return (
    
      <Routes>
        <Route path="/" element={<Forum/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/profile/:id" element={<Profileid/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/*" element={<Forum/>}/>
      </Routes>
    
  );
}

export default App;