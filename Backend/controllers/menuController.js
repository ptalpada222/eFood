const MenuItem = require("../models/MenuItem");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads/ directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

// File filter (allow only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"));
};

const upload = multer({ storage, fileFilter }).single("image");

// Add Dish
exports.addMenuItem = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!req.file || !req.file.filename) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    try {
      const { dish_name, variety, price } = req.body;

      // Check if dish name already exists
      const existingDish = await MenuItem.findOne({ dish_name });
      if (existingDish) {
        return res.status(400).json({ error: "Dish name already exists" });
      }

      const newItem = new MenuItem({
        dish_name,
        variety,
        price,
        image: `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`,
      });

      await newItem.save();
      const io = req.app.get("io"); // Get socket.io instance
      io.emit("menuUpdated"); // Notify all clients about the menu update
      res.status(201).json({ message: "Dish added successfully", newItem });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ error: "Dish name already exists" });
      }
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: "Price must be at least ₹40" });
      }
      res.status(500).json({ error: error.message });
    }
  });
};

// Get Dishes
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dishes" });
  }
};

// Delete Dish
exports.deleteMenuItem = async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    const io = req.app.get("io");
    io.emit("menuUpdated"); // Notify all clients about the menu update
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete dish" });
  }
};
