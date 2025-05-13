const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, unique: true },
  password: { type: String},
  otp: {type : String},
  otpExpiry:{ type: Date},
});

const Customer = mongoose.model("customerTable", customerSchema); // Table name: customerTable
module.exports = Customer;
