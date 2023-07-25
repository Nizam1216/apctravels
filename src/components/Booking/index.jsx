import React, { useState } from "react";
import "../Navbar/navbar.css";
import "../../App.css";

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fromlocation: "",
    tolocation: "",
    numberofpeopletravelling: "",
    bookToAndFrom: false,
  });

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkboxes, use the checked value instead of the value attribute
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 6000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Remove any additional properties that might have been added
    const {
      name,
      email,
      phone,
      fromlocation,
      tolocation,
      numberofpeopletravelling,
      bookToAndFrom,
      DatetoBookTicket,
      returnticket,
    } = formData;

    const requestBody = {
      name,
      email,
      phone,
      fromlocation,
      tolocation,
      numberofpeopletravelling,
      bookToAndFrom,
      DatetoBookTicket,
      returnticket,
    };

    // Make a POST request to the backend API
    fetch("https://apctravels.onrender.com/api/bookticket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to submit the form.");
        }
      })
      .then((data) => {
        console.log("Form submitted successfully:", data);
        // Reset the form after successful submission if desired
        setFormData({
          name: "",
          email: "",
          phone: "",
          fromlocation: "",
          tolocation: "",
          numberofpeopletravelling: "",
          DatetoBookTicket: "",
          returnticket: "",
          bookToAndFrom: false,
        });
        handleNotification("success", "Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error.message);
        handleNotification("error", "Failed to submit the form.");
      });
  };

  return (
    <>
      {/* Your form JSX here */}
      <div className="content-container">
        <div className="container">
          {notification.type === "success" && (
            <div className="notification success-box">
              {notification.message}
            </div>
          )}
          {notification.type === "error" && (
            <div className="notification error-box">{notification.message}</div>
          )}
          <form onSubmit={handleSubmit}>
            <h1 className="App">Apc Travels Booking</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword2"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mobile Number
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                required
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                From Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="example : chennai,TamilNadu"
                required
                name="fromlocation"
                value={formData.fromlocation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                To Location
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword2"
                placeholder="example : hyderabad,Telangana"
                required
                name="tolocation"
                value={formData.tolocation}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Number of people Travelling
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="example : 2"
                required
                name="numberofpeopletravelling"
                value={formData.numberofpeopletravelling}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword5" className="form-label">
                Date to Book Ticket
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword5"
                placeholder="example : 27/09/2023"
                required
                name="DatetoBookTicket"
                value={formData.DatetoBookTicket}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword7" className="form-label">
                Return Ticket Date(only if you require)
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword7"
                placeholder="example : 29/09/2023"
                required
                name="returnticket"
                value={formData.returnticket}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                name="bookToAndFrom"
                checked={formData.bookToAndFrom}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                book to and from?
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Start Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
