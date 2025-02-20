const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const cors = require ("cors");
const nodemailer = require ("nodemailer");
const app = express ();
const PORT = 5000;

app.use (cors({
    origin: ["https://dtc-bus.vercel.app",
        "https://dtc-bus-user.vercel.app",
    ]
}));
app.use (express.json ());

app.use (bodyParser.json ());

mongoose.connect ("mongodb+srv://p684188:Prince@123456@cluster0.c3uta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
})
    .then (() => console.log ("connected to Mongodb"))
    .catch ((err) => console.log ("Mongodb connection error", err));

const signupUserSchema = new mongoose.Schema ({
    name: String,
    email: String,
    password: String,
})

const signupUser = mongoose.model ('SignUpUser', signupUserSchema);

app.post ('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await signupUser.findOne ({ email });

        if (existingUser) {
            return res.status (200).json ({error: "user already exist"});
        }
        const newsignupUser = new signupUser ({ name, email, password });
        const savedsignupdata = await newsignupUser.save ();
        res.status (200).json (savedsignupdata);
    }

    catch (err) {
        res.status (500).json ({error: "failed to save signup data"});
    }
})

app.post ("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await signupUser.findOne ({ email });

        if (!user) {
            return res.status (400).json ({error: "user not found, signup first"});
        }

        console.log (password);
        console.log (user.password);

        if (password != user.password) {
            return res.status (401).json ({message: "invalid password"});
        }

        res.status (200).json ({message: "login successful", user});
    }

    catch (err) {
        res.status(500).json ({error: "server error"});
    }
})

const bookingUserSchema = new mongoose.Schema ({
    id: String,
    name: String,
    email: String,
    phone: Number,
    from: String,
    to: String,
    date: String,
    time: String,
})

const bookingUser = mongoose.model ('bookingUser', bookingUserSchema);

app.post ('/api/booking', async (req, res) => {
    const { id, name, email, phone, from, to, date, time } = req.body;
    const user = await signupUser.findOne ({ email });

    if (!user) {
        return res.status (409).json ({ message: "user not exist"});
    }
    const newbookingdata = new bookingUser ({ id, name, email, phone, from, to, date, time });

    try {
        const savedbookingdata = await newbookingdata.save ();
        res.status (200).json ({message: "booking successfully", ticket: savedbookingdata});
    }

    catch (err) {
        res.status (500).json ({error: "failed to booking ticket"});
    }
})

app.post ("/api/fetchBookings", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await signupUser.findOne ({ email });

        if (!user) {
            return res.status (400).json ({ error: "user not found, please sign up"});
        }

        if (password != user.password) {
            return res.status (401).json ({ message: "invalid password"})
        }

        const userBookings = await bookingUser.find ({ email });

        // if (userBookings.length === 0) {
        //     res.status (404).json ({ message: "no booking is found"});
        // }

        res.status (200).json (userBookings);

        console.log (userBookings);
    }

    catch (err) {
        res.status (500).json ({ error: "server error"});
    }
})

app.post ("/api/send-booking-info", async (req, res) => {
    const { name, email, phone, from, to, date, time} = req.body;

    if (!email) {
        return res.status (405).json ({message: "enter email"});
    }

    const transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
            user: "princekhandelwal412@gmail.com",
            pass: "fwpz chtd rqax ctct",
        },
    });

    const mailOptions = {
        from: "princekhandelwal412@gmail.com",
        to: email,
        subject: "Your Booking Details",
        html: `<p>Welcome to DTC Delhi</p>
        <h2>Your Booking Details</h2>
        <p>name: <strong>${name}</strong></p>
        <p>phone: <strong>${phone}</strong></p>
        <p>From: <strong>${from}</strong> to: <strong>${to}</strong></p>
        <p>Date: <strong>${date}</strong></p>
        <p>Time: <strong>${time}</strong></p>`,
    };

    try {
        await transporter.sendMail (mailOptions);
        return res.status (201).json ({message: "booking details is sent to email"});
    }

    catch (error) {
        console.error (error);
        res.status (500).json ({message: "failed to send message"});
    }
})

const reviewSchema = new mongoose.Schema ({
    name: String,
    email: String,
    review: String,
})

const reviewData = mongoose.model ("reviewData", reviewSchema);

app.post ("/api/reviews", async (req, res) => {
    const { name, email, review } = req.body;

    try {
        const existingUser = await signupUser.findOne ({ email });

        if (!existingUser) {
            return res.status (405).json ({message: "user not exist, signup first"});
        }

        const newreviewData = new reviewData ({ name, email, review });
        const savedreviewData = await newreviewData.save ();
        res.status (200).json (savedreviewData);
    }

    catch (err) {
        res.status (500).json ({ error: "failed to save review data"});
    }
})

app.listen (PORT, () => {
    console.log (`server is running at port ${PORT}`);
})