import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { Context } from "../context/Context";
import toast from "react-hot-toast";

function Navbar() {

  const { token, logout } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">
        <Link to="/">SmartNotes</Link>
      </h2>

      <div className="nav-links">

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