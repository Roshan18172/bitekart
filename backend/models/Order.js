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
    deliveryPartnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryPartner",
        default: null
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
        enum: ["pending",
            "accepted",
            "cooking",
            "ready_for_pickup",
            "picked_up",
            "reached_location",
            "out_for_delivery",
            "delivered",
            "cancelled"],
        default: "pending"
    },

    paymentStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },

    paymentMethod: String,

    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    isRated: {
        type: Boolean,
        default: false
    },

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
