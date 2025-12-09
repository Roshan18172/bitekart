const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const router = express.Router();

router.post("/create", async (req, res) => {
    try {
        const { userId, items, subtotal, gst, deliveryCharge, total, restaurantId } = req.body;

        if (!userId || items.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid order data" });
        }

        // Create order
        const order = new Order({
            userId,
            restaurantId,
            items,
            subtotal,
            gst,
            deliveryCharge,
            total,
            status: "pending", // or "placed"
            createdAt: new Date()
        });

        await order.save();

        // Clear user's cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.json({ success: true, orderId: order._id, msg: "Order placed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
});

module.exports = router;
