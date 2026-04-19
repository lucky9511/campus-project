const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/projectfsd";
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

let otpStore = {}; // store OTP temporarily

const EMAIL_USER = (process.env.EMAIL_USER || "").trim();
const EMAIL_PASS = (process.env.EMAIL_PASS || "").trim();

if (!EMAIL_USER || !EMAIL_PASS) {
    console.warn("Missing EMAIL_USER or EMAIL_PASS in backend/.env");
}

// configure email transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});


// SEND OTP
app.post("/send-verification", (req, res) => {

    const email = req.body.email;

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore[email] = otp;

    const mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.log("OTP send error:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
        else {
            console.log("OTP sent: " + otp);
            res.json({ success: true });
        }

    });

});


// VERIFY OTP
app.post("/verify-otp", async (req, res) => {

    const userOtp = req.body.otp;
    const email = req.body.email;

    if (otpStore[email] == userOtp) {

        delete otpStore[email];

        try {
            await User.findOneAndUpdate(
                { email },
                { email, verified: true },
                { upsert: true, new: true }
            );
            res.json({ success: true });
        } catch (error) {
            console.error("Failed to save user:", error);
            res.status(500).json({ success: false, error: "Database error" });
        }

    } else {

        res.json({success:false});

    }

});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
