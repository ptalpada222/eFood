const Booking = require("../models/Booking");

const TOTAL_TABLES = 8;
const MAX_PEOPLE_PER_TABLE = 5;
const OPEN_TIME = "09:00"; // 9:00 AM
const CLOSE_TIME = "23:59"; // 12:00

// Utility function to check time validity
const isTimeValid = (startTime, endTime) => {
  return startTime >= OPEN_TIME && endTime <= CLOSE_TIME && startTime < endTime;
};

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phoneNumber, numberOfPeople, date, startTime, endTime, tableNumber } = req.body;

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Check if the booking date is in the past
    if (date < today) {
      return res.status(400).json({ message: "Invalid date. You cannot book a table for past dates." });
    }

    if (!isTimeValid(startTime, endTime)) {
      return res.status(400).json({ message: `Bookings are allowed only between ${OPEN_TIME} and ${CLOSE_TIME}.` });
    }

    if (tableNumber < 1 || tableNumber > TOTAL_TABLES) {
      return res.status(400).json({ message: `Invalid table number. Choose between 1 to ${TOTAL_TABLES}.` });
    }

    if (numberOfPeople < 1 || numberOfPeople > MAX_PEOPLE_PER_TABLE) {
      return res.status(400).json({ message: `Each table can accommodate up to ${MAX_PEOPLE_PER_TABLE} people.` });
    }

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      date,
      tableNumber,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lt: endTime } },
      ],
    });

    if (overlappingBooking) {
      return res.status(400).json({
        message: `Table ${tableNumber} is already booked from ${overlappingBooking.startTime} to ${overlappingBooking.endTime}.`,
      });
    }

    const newBooking = new Booking({
      name,
      email,
      phoneNumber,
      numberOfPeople,
      date,
      startTime,
      endTime,
      tableNumber,
    });

    await newBooking.save();

    res.status(201).json({
      message: `Table ${tableNumber} booked successfully on ${date} from ${startTime} to ${endTime}.`,
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Check table availability
exports.checkAvailability = async (req, res) => {
  try {
    const { date, startTime, endTime, tableNumber } = req.body;

    if (!isTimeValid(startTime, endTime)) {
      return res.status(400).json({ message: `Bookings are allowed only between ${OPEN_TIME} and ${CLOSE_TIME}.` });
    }

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Prevent checking availability for past dates
    if (date < today) {
      return res.status(400).json({
        message: "Invalid date. You cannot check availability for past dates.",
      });
    }
    
    const overlappingBooking = await Booking.findOne({
      date,
      tableNumber,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
        { startTime: { $gte: startTime, $lt: endTime } },
      ],
    });

    if (overlappingBooking) {
      return res.status(200).json({
        available: false,
        message: `Table ${tableNumber} is already booked from ${overlappingBooking.startTime} to ${overlappingBooking.endTime}.`,
      });
    }

    res.status(200).json({ available: true, message: `Table ${tableNumber} is available on ${date} from ${startTime} to ${endTime}.` });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
//Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const booking = await Booking.findByIdAndUpdate(id, updates, { new: true });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
