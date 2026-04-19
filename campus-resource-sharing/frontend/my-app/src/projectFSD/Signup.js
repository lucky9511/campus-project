import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendVerification, verifyOtp } from "../api";
import "./style.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Send OTP
      const data = await sendVerification(email);

      if (!data.success) {
        alert("Failed to send OTP");
        return;
      }

      const userOtp = prompt("Enter OTP sent to your email:");

      if (!userOtp) {
        alert("OTP is required");
        return;
      }

      // Verify OTP
      const verify = await verifyOtp(email, userOtp);

      if (!verify.success) {
        alert("Wrong OTP");
        return;
      }

      // Save data to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("userLoggedIn", "true");

      alert("Signup successful ✅");

      // Redirect to dashboard page
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <label>Username :</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Confirm Password :</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;