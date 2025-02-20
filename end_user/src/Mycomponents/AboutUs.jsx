import React from 'react';
import './AboutUs.css'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function AboutUs() {
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

        <div className="about-container">
            <h1>About Us</h1>
            <p className="intro">
                Welcome to <strong>EasyTicket</strong>, your one-stop destination for hassle-free ticket booking.
                Whether you're planning a trip, an event, or a fun outing, we make booking simple and seamless.
            </p>

            <h2>Our Mission</h2>
            <p>
                Our mission is to provide a <strong>fast, secure, and convenient</strong> way to book tickets online. 
                We strive to offer the best deals, a user-friendly experience, and excellent customer support.
            </p>

            <h2>Why Choose Us?</h2>
            <ul className="features-list">
                <li>✅ Easy & Quick Booking Process</li>
                <li>✅ Best Prices & Discounts</li>
                <li>✅ Secure Payment Gateway</li>
                <li>✅ 24/7 Customer Support</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you have any questions, feel free to reach out!</p>
            <p><strong>Email:</strong> support@DTC.gov.in</p>
            <p><strong>Phone:</strong> +1 234 567 890</p>
        </div>
        <ToastContainer />
        </>
    );
}

export default AboutUs;