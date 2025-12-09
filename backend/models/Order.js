const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: String,
    restaurantId: String,
    items: [
        {
            itemId: String,
            name: String,
            quantity: Number,
            price: Number
        }
    ],
    subtotal: Number,
    gst: Number,
    deliveryCharge: Number,
    total: Number,
    status: { type: String, default: "pending" }, // pending, accepted, delivered
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
