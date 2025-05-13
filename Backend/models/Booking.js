const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfPeople: { type: Number, required: true, min: 1 },
  date: { type: String, required: true }, // Booking date
  startTime: { type: String, required: true }, // Format: HH:mm (24-hour)
  endTime: { type: String, required: true }, // Format: HH:mm (24-hour)
  tableNumber: { type: Number, required: true },
  status: { type: String, default: "reserved" },
});

const Booking = mongoose.model("Table_Booking", bookingSchema);
module.exports = Booking;
