const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpCreatedAt: {
    type: Number,
  },
  otpVerified: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'inActive'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: Number,
  updatedAt: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model("user", userSchema);


