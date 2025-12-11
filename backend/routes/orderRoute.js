const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const router = express.Router();

/* ------------------- CREATE ORDER ------------------- */
router.post("/create", async (req, res) => {
    try {
        const { userId, items, subtotal, gst, deliveryCharge, total, restaurantId } = req.body;

        if (!userId || items.length === 0) {
            return res.status(400).json({ success: false, msg: "Invalid order data" });
        }

        const order = new Order({
            userId,
            restaurantId,
            items,
            subtotal,
            gst,
            deliveryCharge,
            total,
            status: "pending",
            paymentStatus: "unpaid"
        });

        await order.save();

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

/* ------------------- PAYMENT API ------------------- */
router.post("/pay", async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;

        await Order.findByIdAndUpdate(orderId, {
            paymentStatus: "paid",
            status: "success",
            paymentMethod
        });

        res.json({ success: true, msg: "Payment successful!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Payment failed" });
    }
});

/* ------------------- GET SINGLE ORDER ------------------- */
router.get("/:orderId", async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch order" });
    }
});

/* ------------------- GET ALL ORDERS OF A USER ------------------- */
router.get("/user/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Failed to fetch orders" });
    }
});

module.exports = router;
