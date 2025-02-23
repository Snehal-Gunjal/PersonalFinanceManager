import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Finance Manager</h2>
      <div className="nav-links">
        <Link to="/Login">Login</Link>
        <Link to="/Signup">Signup</Link>
        <Link to="/Dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
