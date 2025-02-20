import React, { useState } from 'react'
import axios from 'axios';
import './Signup.css'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [signupData, setSignupData] = useState ({
    name: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate ();

  const handleChange = (e) => {
    setSignupData ({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault ();

    if (!signupData.name.trim () || !signupData.email.trim () || !signupData.password.trim ()) {
      handleError ("all fields are required")
      return;
    }

    else {
      try {
        const response = await axios.post ("http://127.0.0.1:5000/api/signup", signupData);
        console.log ("signup data saved:", response.data);

        setSignupData ({
          name: '',
          email: '',
          password: '',
        })

        handleSuccess ("signup successful");
        navigate ("/home");
      }

      catch (err) {
        handleError ("error signup");
        console.log ("error in saving sign up data:", err);
      }
    }
  }
  return (
    <div className='signupContainer'>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up for Users</h2>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' placeholder='enter your name' onChange={handleChange}/>

        <label htmlFor="email">Email</label>
        <input type="email" name='email' placeholder='enter your email' onChange={handleChange}/>

        <label htmlFor="password">Password</label>
        <input type="password" name='password' placeholder='enter password' onChange={handleChange}/>

        <button type='submit'>Register</button>
        <span>Already have an account <a href="/login">login</a></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
