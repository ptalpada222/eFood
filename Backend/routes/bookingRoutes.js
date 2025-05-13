const express = require("express");
const router = express.Router();
const { createBooking, checkAvailability, getAllBookings, updateBooking } = require("../controllers/bookingController");

router.post("/book", createBooking);
router.post("/check-availability", checkAvailability);
router.get("/all", getAllBookings);
router.patch("/update/:id", updateBooking);

module.exports = router;
