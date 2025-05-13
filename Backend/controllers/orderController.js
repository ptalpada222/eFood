const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const mongoose = require("mongoose");
exports.createOrder = async (req, res) => {
  try {
    const { customer_id, items, shipping_address, payment_method } = req.body;

    let totalAmount = 0;
    let orderItems = [];

    for (const item of items) {
      const { product_id, product_name, quantity, unit_price } = item;
      const total_price = quantity * unit_price;
      totalAmount += total_price;

      orderItems.push({
        product_id,
        product_name,
        quantity,
        unit_price,
        total_price,
      });
    }

    const order = new Order({
      customer_id,
      total_amount: totalAmount,
      shipping_address,
      payment_method,
    });
    await order.save();

    for (const item of orderItems) {
      await new OrderItem({ ...item, order_id: order._id }).save();
    }

    res
      .status(201)
      .json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer_id");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer_id");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const { id: orderId } = req.params; // Get order ID from request params

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid Order ID format" });
    }

    // Fetch all order items related to this order ID
    const orderItems = await OrderItem.find({ order_id: orderId });

    if (!orderItems || orderItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No order items found for this order" });
    }

    res.status(200).json({ items: orderItems });
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
