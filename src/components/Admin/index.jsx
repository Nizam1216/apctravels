import React, { useState, useEffect } from "react";
import "../Navbar/navbar.css";
import "../../App.css";

const Admin = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    fetch("https://apctravels.onrender.com/api/showapplications")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch applications.");
        }
      })
      .then((data) => {
        // Update the applications state with the fetched data
        setApplications(data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  return (
    <>
      <div
        className="container"
        style={{
          marginTop: "-200px",
          marginBottom: "-1rem",
          padding: "1rem",
        }}
      >
        <h1 className="container" style={{ color: "red" }}>
          Online Ticket Bookings
        </h1>
        {applications.map((application) => (
          <div
            key={application._id}
            className="container"
            style={{
              backdropFilter: "blur(2px)",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "blue",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>Name: {application.name}</h3>
            <p>Phone: {application.phone}</p>
            <p>Email: {application.email}</p>
            <p>From Location: {application.fromlocation}</p>
            <p>To Location: {application.tolocation}</p>
            <p>
              Number of People Travelling:{" "}
              {application.numberofpeopletravelling}
            </p>
            <p>Date to Book Ticket : {application.DatetoBookTicket}</p>
            <p>Return Ticket : {application.returnticket}</p>
            <p>Book To and From: {application.bookToAndFrom ? "Yes" : "No"}</p>
            <p>Applied Date : {new Date(application.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Admin;
