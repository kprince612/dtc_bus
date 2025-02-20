import axios from "axios";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import "./Booking.css";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";

function Booking() {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    date: "",
    time: "",
  });

  const [qrcodeData, setQrcodeData] = useState("");
  const [ticketId, setTicketId] = useState("");

  const qrRef = useRef();

  const sendBookingInfo = async () => {
    if (!bookingData.email.trim()) {
      handleError("Please enter email for booking ticket");
      return;
    }

    try {
      const response = await axios.post("https://dtc-bus.vercel.app/api/send-booking-info", {
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          from: bookingData.from,
          to: bookingData.to,
          date: bookingData.date,
          time: bookingData.time,
        }
      );

      if (response.status === 201) {
        handleSuccess(`Your booking Details is sent to ${bookingData.email}`);
        return;
      } else {
        handleError("failed to send booking details");
        return;
      }
    } catch (error) {
      console.error(error);
      handleError("error in sending booking email");
    }
  };

  const handleChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookingData.name.trim() ||
      !bookingData.phone.trim() ||
      !bookingData.from.trim() ||
      !bookingData.to.trim() ||
      !bookingData.date.trim() ||
      !bookingData.time.trim()
    ) {
      handleError("all fields are required");
      return;
    }

    if (bookingData.from === bookingData.to) {
      handleError("from and to must be different");
      return;
    } else {
      try {
        const newticketId = `TICKET-${Date.now()}`;
        setTicketId(newticketId);

        const qrCodeData = {
          id: newticketId,
          name: bookingData.name,
          email: bookingData.email,
          phone: bookingData.phone,
          from: bookingData.from,
          to: bookingData.to,
          date: bookingData.date,
          time: bookingData.time,
        };

        const response = await axios.post("https://dtc-bus.vercel.app/api/booking", {
          ...bookingData,
          id: newticketId,
        });

        if (response.status === 409) {
          handleError("login first, then book ticket");
          return;
        }

        console.log("booking saved", response.data);

        setQrcodeData(JSON.stringify(qrCodeData));

        setBookingData({
          ticketId: "",
          name: "",
          email: "",
          phone: "",
          from: "",
          to: "",
          date: "",
          time: "",
        });

        handleSuccess("Booking Successfully");
        sendBookingInfo();
        console.log(qrCodeData);
      } catch (err) {
        handleError(
          "error in booking ticket, or sign in first then book ticket"
        );
        console.log("error in ticket booking:", err);
      }
    }
  };

  const downloadQRCode = useReactToPrint({
    content: () => qrRef.current,
    documentTitle: `Ticket-${ticketId}`,
    onAfterPrint: () => handleSuccess ("QR code download successfully"),
  });
  return (
    <div>
      <nav>
        <ul>
          <li>
            {" "}
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/booking">Book Now</a>
          </li>
          <li>
            <a href="/account">My Account</a>
          </li>
          <li><Link to="/review">Reviews</Link></li>
        </ul>
      </nav>
      {!qrcodeData && (
        <div className="bookingContainer">
          <form onSubmit={handleSubmit}>
            <h2>Online Ticket Booking</h2>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="enter your name"
              onChange={handleChange}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              onChange={handleChange}
            />

            <label htmlFor="phone">Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="enter your mobile number"
              onChange={handleChange}
            />
            <div>
              <label htmlFor="from">From : </label>
              <select name="from" id="from" onChange={handleChange}>
                <option>Arrival From</option>
                <option value="Anand_Vihar_ISBT">Anand Vihar ISBT</option>
                <option value="Ashok_Vihar">Ashok Vihar</option>
                <option value="Badarpur">Badarpur</option>
                <option value="Central_Secretariat">Central Secretariat</option>
                <option value="Chandni_Chowk">Chandni Chowk</option>
                <option value="Connaught_Place">Connaught Place</option>
                <option value="Dwarka">Dwarka</option>
                <option value="Gokalpur">Gokalpur</option>
                <option value="Hauz_Khas">Hauz Khas</option>
                <option value="India_Gate">India Gate</option>
                <option value="ISBT_Kashmere_Gate">ISBT Kashmere Gate</option>
                <option value="Janakpuri">Janakpuri</option>
                <option value="Karol_Bagh">Karol Bagh</option>
                <option value="Lajpat_Nagar">Lajpat Nagar</option>
                <option value="Mandi_House">Mandi House</option>
                <option value="Munirka">Munirka</option>
                <option value="Nehru_Place">Nehru Place</option>
                <option value="New_Delhi_Railway_Station">New Delhi Railway Station</option>
                <option value="Okhla">Okhla</option>
                <option value="Palam">Palam</option>
                <option value="Pitampura">Pitampura</option>
                <option value="Rajouri_Garden">Rajouri Garden</option>
                <option value="Rohini">Rohini</option>
                <option value="Saket">Saket</option>
                <option value="Sarita_Vihar">Sarita Vihar</option>
                <option value="Shahdara">Shahdara</option>
                <option value="Vasant_Kunj">Vasant Kunj</option>
                <option value="Vikas_Puri">Vikas Puri</option>
              </select>

              <label htmlFor="to">To : </label>
              <select name="to" id="to" onChange={handleChange}>
                <option>Destination To</option>
                <option value="Anand_Vihar_ISBT">Anand Vihar ISBT</option>
                <option value="Ashok_Vihar">Ashok Vihar</option>
                <option value="Badarpur">Badarpur</option>
                <option value="Central_Secretariat">Central Secretariat</option>
                <option value="Chandni_Chowk">Chandni Chowk</option>
                <option value="Connaught_Place">Connaught Place</option>
                <option value="Dwarka">Dwarka</option>
                <option value="Gokalpur">Gokalpur</option>
                <option value="Hauz_Khas">Hauz Khas</option>
                <option value="India_Gate">India Gate</option>
                <option value="ISBT_Kashmere_Gate">ISBT Kashmere Gate</option>
                <option value="Janakpuri">Janakpuri</option>
                <option value="Karol_Bagh">Karol Bagh</option>
                <option value="Lajpat_Nagar">Lajpat Nagar</option>
                <option value="Mandi_House">Mandi House</option>
                <option value="Munirka">Munirka</option>
                <option value="Nehru_Place">Nehru Place</option>
                <option value="New_Delhi_Railway_Station">New Delhi Railway Station</option>
                <option value="Okhla">Okhla</option>
                <option value="Palam">Palam</option>
                <option value="Pitampura">Pitampura</option>
                <option value="Rajouri_Garden">Rajouri Garden</option>
                <option value="Rohini">Rohini</option>
                <option value="Saket">Saket</option>
                <option value="Sarita_Vihar">Sarita Vihar</option>
                <option value="Shahdara">Shahdara</option>
                <option value="Vasant_Kunj">Vasant Kunj</option>
                <option value="Vikas_Puri">Vikas Puri</option>
              </select>
            </div>

            <label htmlFor="date">Date</label>
            <input type="date" name="date" onChange={handleChange} />

            <label htmlFor="time">Time</label>
            <input type="time" name="time" onChange={handleChange} />

            <button>Book Now</button>
          </form>
        </div>
      )}

      {qrcodeData && (
        <div className="qrcodeContainer">
          <h2>Scan your ticket</h2>
          <div ref={qrRef} style={{ padding: "10px", background: "#fff"}}>
            <QRCode value={qrcodeData} size={256} />
          </div>
          <h4>Your ticket id: {ticketId}</h4>
          <span>Note: take screenshot of the ticket</span>
          {/* <button className='download-btn' onClick={downloadQRCode}>Download QR Code</button> */}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Booking;
