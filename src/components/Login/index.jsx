import React, { useState } from "react";
import "../Navbar/navbar.css";

import "../../App.css";

const Login = () => {
  const styles = {
    marginTop: "1%",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid login credentials");
        }
      })
      .then((data) => {
        // Handle successful login
        setNotification({
          message: "Logged in successfully please reload to access data",
          type: "success",
          visible: true,
        });
        // Handle successful login action, e.g., store the token and redirect to the dashboard
        localStorage.setItem("token", data.authToken);
      })
      .catch((error) => {
        // Handle failed login
        setNotification({
          message: "Invalid login credentials",
          type: "error",
          visible: true,
        });
        console.error("Error logging in:", error.message);
      });

    // Hide the notification after 7 seconds
    setTimeout(() => {
      setNotification({
        ...notification,
        visible: false,
      });
    }, 7000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container" style={styles}>
        <form onSubmit={handleSubmit}>
          <h1>Only Admin can Access this page. Please Login</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      {notification.visible && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </>
  );
};

const Notification = ({ message, type }) => {
  const notificationStyles = {
    position: "fixed",
    top: "1rem",
    right: "1rem",
    padding: "1rem",
    borderRadius: "5px",
    color: "#fff",
    zIndex: 9999,
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "green";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <div
      style={{
        ...notificationStyles,
        backgroundColor: getBackgroundColor(),
      }}
    >
      {message}
    </div>
  );
};

export default Login;
