const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
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

    status: {
        type: String,
        enum: ["pending", "accepted", "cooking", "dispatched", "delivered", "cancelled" ],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },

    paymentMethod: String,

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
