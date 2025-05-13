const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const rateLimitMiddleware = require("./middlewares/rateLimitMiddleware");
const { morganMiddleware } = require("./middlewares/logger");
const passport = require('passport');
const session = require('express-session');
const cron = require("./utils/cronJob");
require('dotenv').config();
require('./config/passport');
const auth = require('./routes/auth');
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const menuRoutes = require("./routes/menuRoutes");
const path = require("path");

dotenv.config();
const app = express();
const server = http.createServer(app);

// Use CORS before any other middleware or route
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // only if session or passport is needed on frontend
}));

app.use(express.json());
app.use(rateLimitMiddleware);
app.use(morganMiddleware);
app.use("/uploads", express.static("uploads"));


// Session configuration
app.use(
    session({
      secret: 'prakash',
      resave: false,
      saveUninitialized: false,
    })
  );
// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

connectDB();

//api call
app.use("/api/auth", authRoutes);
app.use(auth);
app.use("/api/contact",contactRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/menu", menuRoutes);

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const io = new Server(server, {
  cors: {
    origin:["http://127.0.0.1:3000", "http://localhost:3000"],
  },
});

// Make io globally available (step 3 will use this)
app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 Client connected:", socket.id);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
