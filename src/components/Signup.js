import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    if (storedUsers.some(user => user.email === email)) {
      setError("Email already exists! Please login.");
      return;
    }

    // Store new user
    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));

    // Redirect to login
    alert("Signup successful! You can now login.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;

