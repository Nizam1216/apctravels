const express = require("express");
const router = express.Router();

const Apply = require("../models/Apply");

// Route for posting a application from frontend form
router.post("/bookticket", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      fromlocation,
      tolocation,
      numberofpeopletravelling,
      bookToAndFrom,
      DatetoBookTicket,

      returnticket,
      date,
    } = req.body;

    // Create a new note document
    const apply = new Apply({
      name,

      email,
      phone,
      fromlocation,
      tolocation,
      numberofpeopletravelling,
      bookToAndFrom,
      DatetoBookTicket,
      returnticket,
      date,
    });

    // Save the document to the database
    await apply.save();

    res.status(201).json({ message: "Applied sucessfully" });
  } catch (error) {
    console.error("Error Applying for job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route for retrieving all applications
router.get("/showapplications", async (req, res) => {
  try {
    const apply = await Apply.find();

    res.status(200).json(apply);
  } catch (error) {
    console.error("Error retrieving application :", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
