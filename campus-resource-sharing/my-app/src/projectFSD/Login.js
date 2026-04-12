import { useState } from "react";
import { Link } from "react-router-dom";
import "./project.css";

function Login() {
  const [email, setEmail] = useState("");
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

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/send-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        alert("OTP sent to your email. Please check and enter the OTP.");
        setShowOtpField(true);
        setOtp("");
      } else {
        alert("Failed to send OTP. Please try again.");
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
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ otp, email })
      });

      const data = await response.json();

      if (data.success) {
        setVerificationMessage("OTP Verified Successfully! Logging in...");
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", email);

        setTimeout(() => {
          window.location.href = "/resources.html";
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
