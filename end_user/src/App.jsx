import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Mycomponents/Signup'
import Login from './Mycomponents/Login'
import Home from './Mycomponents/Home';
import Booking from './Mycomponents/Booking';
import Account from './Mycomponents/Account';
import AboutUs from './Mycomponents/AboutUs';
import Reviews from './Mycomponents/Reviews';

function App() {
    return (
      <Router>
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/booking' element={<Booking />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/about' element={<AboutUs />}></Route>
        <Route path='/review' element={<Reviews />}></Route>
      </Routes>
      </Router>
  )
}

export default App
