// import React from 'react'
// import '../Mycomponents/Home.css'

// function Home() {
//   return (
//     <div>
//         <nav>
//             <ul>
//                 <li> <a href="/home">Home</a></li>
//                 <li><a href="/about">About Us</a></li>
//                 <li><a href="/booking">Booking</a></li>
//                 <li><a href="/account">Account</a></li>
//             </ul>
//         </nav>

//         <div className="homeContainer">
//             <div className="homeBox1">
//                 <h2>Delhi Transport Corporation</h2>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus et non dolor facere rerum, repudiandae reiciendis alias, doloribus tempora, adipisci eius odio dolores qui delectus. A tempore inventore, necessitatibus id iste explicabo adipisci odio recusandae libero quae, suscipit nisi laudantium nemo ipsum. Odio, rem. Deleniti natus qui omnis, recusandae tempora ratione dolores facilis nostrum eaque harum, accusantium tempore incidunt vel? Tenetur ullam deserunt, ratione corrupti aut perferendis nobis, eligendi quam, odio libero dolore minima suscipit?</p>
//                 <button id='btn'>SignUp/Login for passengers</button>
//                 <button id='btn'>Login for Admin</button>
//             </div>

//             <div className="homeBox2">

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Home


import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS file
import { ToastContainer } from "react-toastify";

function Home() {
  return (
    <div className="home-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="logo">EasyBus</h1>
        <ul className="nav-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/booking">Book Now</Link></li>
          <li><Link to="/account">My Account</Link></li>
          <li><Link to="/review">Reviews</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <h2>Your Journey Begins Here</h2>
        <p>Book your bus tickets easily with the best deals.</p>
        <Link to="/booking" className="btn">Book Now</Link>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature">
          <h3>🚍 Easy Booking</h3>
          <p>Quick and hassle-free online booking experience.</p>
        </div>
        <div className="feature">
          <h3>💰 Best Prices</h3>
          <p>Get the most affordable fares with discounts.</p>
        </div>
        <div className="feature">
          <h3>🛡️ Secure Payment</h3>
          <p>100% secure and trusted payment gateway.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 DTC@gov.in. All rights reserved.</p>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default Home;
