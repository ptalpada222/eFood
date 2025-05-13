const express = require("express");
const router = express.Router();
const { createOrder, getOrders, getOrderById, updateOrderStatus,getOrderItemById } = require("../controllers/orderController");

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);
router.get("/item/:id", getOrderItemById);


module.exports = router;
