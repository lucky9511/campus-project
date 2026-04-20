import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendVerification, verifyOtp } from "../api";
import "./project.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (email !== storedEmail || password !== storedPassword) {
      alert("Invalid email or password!");
      return;
    }

    setLoading(true);

    try {
      const data = await sendVerification(email);

      if (data.success) {
        alert("OTP sent to your email. Please check and enter the OTP.");
        setShowOtpField(true);
        setOtp("");
      } else {
        alert(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.trim() === "") {
      alert("Please enter the OTP.");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp(email, otp);

      if (data.success) {
        setVerificationMessage("OTP Verified Successfully! Logging in...");
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setVerificationMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Student Resources Login</h1>

      <form onSubmit={showOtpField ? handleVerifyOtp : handleSendOtp}>
        {!showOtpField ? (
          <>
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label>Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <label>Enter OTP :</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the 6-digit OTP"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {verificationMessage && (
          <p
            style={{
              color: verificationMessage.includes("Successfully")
                ? "green"
                : "red"
            }}
          >
            {verificationMessage}
          </p>
        )}

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;