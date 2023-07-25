const mongoose = require("mongoose");

const ApplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  fromlocation: {
    type: String,
    required: true,
  },
  tolocation: {
    type: String,
    required: true,
  },
  numberofpeopletravelling: {
    type: String,
    required: true,
  },
  DatetoBookTicket: {
    type: String,
    required: true,
  },
  returnticket: {
    type: String,
    default: "not required",
  },

  bookToAndFrom: {
    type: Boolean,
    default: false, // Set the default value to false if not provided
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const Apply = mongoose.model("apply", ApplySchema);
module.exports = Apply;
