//This utils is for table-booking. This will run every minute and check table reservation and automatically release the table.
//DEFAULT time for every table booking is 1 houres.
const cron = require("node-cron");
const Booking = require("../models/Booking");

// Run every minute to free expired bookings
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // Format: HH:mm
    const currentDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Find expired bookings
    const expiredBookings = await Booking.find({
      date: currentDate,
      endTime: { $lt: currentTime },
      status: "reserved",
    });

    for (const booking of expiredBookings) {
      booking.status = "completed"; // Mark as completed
      await booking.save();
      console.log(`✅ Table ${booking.tableNumber} is now free.`);
    }
  } catch (error) {
    console.error("❌ Error in cron job:", error.message);
  }
});

module.exports = cron;
