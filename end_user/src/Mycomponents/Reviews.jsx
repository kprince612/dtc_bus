import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import "./Reviews.css"

function Reviews() {
    const [reviews, setReviews] = useState ({
        name: "",
        email: "",
        review: "",
    })

    const navigate = useNavigate ();

    const handleChange = (e) => {
        setReviews ({...reviews, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault ();

        if (!reviews.name.trim () || !reviews.email.trim () || !reviews.review.trim ()) {
            handleError ("all field are required");
            return;
        }

        else {
            try {
                const response = await axios.post ("http://127.0.0.1:5000/api/reviews", reviews);

                console.log ("Review data save:", response.data);

                setReviews ({
                    name: "",
                    email: "",
                    review: "",
                })

                handleSuccess ("Your review save successful");

                setTimeout (() => {
                    navigate ("/home");
                }, 1000)
            }

            catch (err) {
                handleError ("review save error");
                console.log (err);
            }
        }
    }
  return (
    <>
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/booking">Book Now</Link></li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/review">Reviews</Link></li>
            </ul>
        </nav>
    <div>
      <div className="reviewContainer">
        <form onSubmit={handleSubmit}>
            <h2>Give Your Review</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' placeholder='enter your name' onChange={handleChange}/>

            <label htmlFor="email">Email:</label>
            <input type="email" name='email' placeholder='enter email' onChange={handleChange}/>

            <label htmlFor="review">Your Review</label>
            <textarea name="review" id="review" placeholder='enter your review' onChange={handleChange}></textarea>

            <button>Review Now</button>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Reviews