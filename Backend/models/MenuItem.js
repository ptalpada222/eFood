const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  image: { type: String, required: true },
  dish_name: { type: String, required: true,unique:true },
  variety: { type: String, enum: ["Starters", "Main Course","Desserts","Beverages"], required: true },
  price: { type: Number, required: true,min:40 },
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
