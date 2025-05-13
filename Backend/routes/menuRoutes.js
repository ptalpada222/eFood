const express = require("express");
const router = express.Router();
const { addMenuItem, getMenuItems, deleteMenuItem } = require("../controllers/menuController");

router.post("/add", addMenuItem);
router.get("/", getMenuItems);
router.delete("/:id", deleteMenuItem);

module.exports = router;
