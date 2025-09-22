const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    cuisine: { type: String },
    menu: [
        {
            itemName: String,
            price: Number,
            available: { type: Boolean, default: true }
        }
    ]
}, { timestamps: true });

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
