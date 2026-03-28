import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Context } from "../context/Context";
import toast from "react-hot-toast";

function Navbar() {

  const { token, logout } = useContext(Context);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  return (
    <nav className="navbar">

      <h2 className="logo">
        <Link to="/">SmartNotes</Link>
      </h2>

      {/* ✅ HAMBURGER */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>

        <button className="nav-btn" onClick={goBack}>⬅ Back</button>
        <button className="nav-btn" onClick={goForward}>Forward ➡</button>

        {!token ? (
          <>
            <Link to="/signup" className="nav-item">Signup</Link>
            <Link to="/login" className="nav-item">Login</Link>
          </>
        ) : (
          <>
            <Link to="/notes" className="nav-item">Notes</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;