import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // ✅ Fix path
import Dashboard from "./components/Dashboard";  // ✅ Fix path
import Login from "./components/Login";  // ✅ Fix path
import Signup from "./components/Signup";  // ✅ Fix path

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar stays always visible */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
