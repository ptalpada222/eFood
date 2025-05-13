const mongoose = require("mongoose");
require("../models/Customer");

const OrderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customerTable",
    required: true,
  },
  order_date: { type: Date, default: Date.now },
  total_amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  shipping_address: { type: String, required: true },
  payment_method: {
    type: String,
    enum: ["Cash", "UPI"],
    required: true,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
