import React from "react";
import logo from "../images/apclogo.jpeg";
import "./navbar.css";
import "../../App.css";

import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    console.log("button clicked");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <>
      <div className="navbar">
        <div className="background-container">
          <ul>
            <li>
              <img src={logo} alt="..." />
            </li>
            <Link to="/">
              <li style={{ textDecoration: "none" }}>Home</li>
            </Link>
            <Link to="/admin">
              <li style={{ textDecoration: "none" }}>Admin</li>
            </Link>
            <Link to="/about">
              <li style={{ textDecoration: "none" }}>About</li>
            </Link>
            {isLoggedIn && ( // Show logout button only if user is logged in
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
