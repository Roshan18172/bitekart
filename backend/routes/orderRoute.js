const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const router = express.Router();

/* ------------------- CREATE ORDER ------------------- */
router.post("/create", async (req, res) => {
    try {
        const { userId, restaurantId, items, subtotal, gst, deliveryCharge, total } = req.body;

        if (!userId || !restaurantId || !items || items.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid order data" });
        }

        const order = new Order({
            userId,
            restaurantId,
            items,
            subtotal,
            gst,
            deliveryCharge,
            total
        });

        await order.save();

        // Clear cart after order
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.json({
            success: true,
            orderId: order._id,
            msg: "Order placed successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
});

/* ------------------- PAYMENT ------------------- */
router.post("/pay", async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;

        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                paymentStatus: "paid",
                paymentMethod
            },
            { new: true }
        );

        // Update user stats AFTER payment success
        await User.findByIdAndUpdate(order.userId, {
            $inc: {
                totalOrders: 1,
                totalSpent: order.total
            }
        });

        res.json({ success: true, msg: "Payment successful!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Payment failed" });
    }
});

/* ------------------- USER: GET MY ORDERS ------------------- */
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch orders" });
    }
});

/* ------------------- GET SINGLE ORDER ------------------- */
router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate("deliveryPartnerId", "name phone");

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        res.json({
            ...order.toObject(),
            deliveryPartner: order.deliveryPartnerId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

/* ------------------- USER CANCEL ORDER ------------------- */
router.put("/cancel/:orderId", async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status: "cancelled" },
            { new: true }
        );

        await User.findByIdAndUpdate(order.userId, {
            $inc: { canceledOrders: 1 }
        });

        res.json({ success: true, msg: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
