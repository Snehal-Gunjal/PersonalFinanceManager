import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSuggestions, setEmailSuggestions] = useState([]);

  useEffect(() => {
    // Fetch stored emails for autocomplete
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setEmailSuggestions(storedUsers.map(user => user.email));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(u => u.email === email);

    if (!user) {
      setError("Email not found! Please signup.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password! Try again.");
      return;
    }

    localStorage.setItem("userToken", "authenticated");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          list="email-list"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <datalist id="email-list">
          {emailSuggestions.map((email, index) => (
            <option key={index} value={email} />
          ))}
        </datalist>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Signup</a></p>
    </div>
  );
};

export default Login;