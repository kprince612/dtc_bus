import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import { Link } from 'react-router-dom'

function Login() {
  const [loginForm, setLoginForm] = useState ({
    email: "",
    password: "",
  })

  const navigate = useNavigate ();

  const handleChange = (e) => {
    setLoginForm ({...loginForm, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault ();

    if (!loginForm.email.trim () || !loginForm.password.trim ()) {
      handleError ("email and password are required");
      return;
    }

    else {
      try {
        const response = await axios.post ("http://127.0.0.1:5000/api/login", loginForm);

        if (response.data.user) {
          handleSuccess ("login Successfully");
          setTimeout (() => {
            navigate ('/home');
          }, 1000)
        }
        
        setLoginForm ({
          email: "",
          password: "",
        })
      }

      catch (err) {
        handleError ("login error or may user not exist, sign up first");
        console.log (err);
      }
    }
  }
  return (
    <div className='loginContainer'>
      <form onSubmit={handleSubmit}>
        <h2>Login for Users</h2>
        <label htmlFor="email">Email</label>
        <input type="email" name='email' placeholder='enter your name' onChange={handleChange}/>

        <label htmlFor="password">Password</label>
        <input type="password" name='password' placeholder='enter password' onChange={handleChange}/>

        <button>Login</button>
        <span>Do not have account? <Link to="/signup">Sign Up</Link></span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
