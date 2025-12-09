const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  itemId: String,  
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
  restaurantId: String
});

const CartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema]
});

module.exports = mongoose.model("Cart", CartSchema);
