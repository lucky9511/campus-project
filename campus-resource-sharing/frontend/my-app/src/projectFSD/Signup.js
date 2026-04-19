import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
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

    // Save data to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("userLoggedIn", "true");

    alert("Signup successful ✅");

    // Redirect to dashboard page
    navigate("/dashboard");
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
