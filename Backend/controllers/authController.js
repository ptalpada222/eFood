const Customer = require("../models/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Access & Refresh Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

// Store refresh tokens
let refreshTokens = [];

exports.signup = async (req, res) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const existingUser = await Customer.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    if (existingUser)
      return res.status(400).json({ message: "Email or Phone already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    const tokens = generateTokens(newCustomer);
    refreshTokens.push(tokens.refreshToken);

    res.status(201).json({
      message: "Signup successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in signup", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    const user = await Customer.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const tokens = generateTokens(user);
    refreshTokens.push(tokens.refreshToken);

    res.json({
      message: "Login successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Error in login", error });
  }
};

exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Refresh token not valid" });

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token expired" });

    const tokens = generateTokens(user);
    res.json(tokens);
  });
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Extract user ID from request parameters

    const user = await Customer.findById(id).select(
      "-password -otp -otpExpiry"
    ); // Exclude sensitive fields

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
