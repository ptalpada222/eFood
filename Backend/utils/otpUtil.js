const crypto = require("crypto");

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const otpExpiryTime = () => {
  return Date.now() + 5 * 60 * 1000; // 5 minutes expiry
};

module.exports = { generateOTP, otpExpiryTime };
