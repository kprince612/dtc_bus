import axios from 'axios';
import React, { useState } from 'react';
import './Account.css'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { Link } from 'react-router-dom';

function Account() {
    const [fetchBooking, setFetchBooking] = useState({
        email: "",
        password: "",
    });

    const [bookings, setBookings] = useState([]);
    const [book, setbook] = useState (false);

    const handleChange = (e) => {
        setFetchBooking({ ...fetchBooking, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fetchBooking.email.trim() || !fetchBooking.password.trim()) {
            handleError ("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:5000/api/fetchBookings", fetchBooking);

            setbook (true);

            if (response.status === 200) {
                handleSuccess ("booking fetch successfully");

                setTimeout (() => {
                    setBookings(response.data);
                }, 1000)
            }

            // else if (response.status === 404) {
            //     handleError ("no booking found");
            // }

            if (response.status === 400) {
                handleError ("login first");
                return;
            }

             else {
                handleError ("Invalid credentials or no booking found")
            }
        } catch (err) {
            console.error("Error fetching bookings:", err);
            handleError ("Failed to fetch bookings, or not sign up")
        }
    };

    return (
        <>
        <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/booking">Book Now</a></li>
                    <li><a href="/account">My Account</a></li>
                    <li><Link to="/review">Reviews</Link></li>
                </ul>
            </nav>
        <div className='account-container'>

            <h2 id='heading'>Previous Orders</h2>

            {book === false && (

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={fetchBooking.email} 
                    onChange={handleChange} 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter password" 
                    value={fetchBooking.password} 
                    onChange={handleChange} 
                />

                <button type="submit">Fetch bookings</button>
            </form>
            )}

            {bookings.length > 0 && (
                <ul>
                    {bookings.map((item) => (
                        <li key={item.id}>
                            <p><strong>From:</strong> {item.from} <strong>To:</strong> {item.to}</p>
                            <p><strong>Date:</strong> {item.date} <strong>Time:</strong> {item.time}</p>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}

            {book === true && bookings.length <= 0 && (
                <p>No previous bookings found</p>
            )}
        </div>
        <ToastContainer />
        </>
    );
}

export default Account;
