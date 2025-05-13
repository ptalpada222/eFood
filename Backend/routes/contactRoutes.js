const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");


router.post("/send", contactController.addContactMessage);
router.get("/messages", contactController.getAllMessages);
router.delete("/messages/:id", contactController.deleteMessage);

module.exports = router;
