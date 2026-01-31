const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["veg", "nonveg"], required: true },
  price: { type: Number, required: true },
  cuisine: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // store image filename
});


const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  image: { type: String }, // store image filename
  address: { type: String },
  cuisine: { type: String },
  rating: {
    type: Number,
    default: 0
  },
  ratingCount: {
    type: Number,
    default: 0
  },
     menu: [MenuItemSchema]
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
