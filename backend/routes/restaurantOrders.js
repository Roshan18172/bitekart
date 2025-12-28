const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

/* ------------------- GET RESTAURANT ORDERS ------------------- */
router.get("/:restaurantId", async (req, res) => {
    const orders = await Order.find({ restaurantId: req.params.restaurantId })
        .sort({ createdAt: -1 });

    res.json(orders);
});

/* ------------------- ACCEPT ORDER ------------------- */
router.put("/accept/:orderId", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "accepted" },
        { new: true }
    );
    res.json(order);
});

/* ------------------- COOKING ------------------- */
router.put("/cooking/:orderId", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "cooking" },
        { new: true }
    );
    res.json(order);
});

/* ------------------- DISPATCH ------------------- */
router.put("/dispatch/:orderId", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "dispatched" },
        { new: true }
    );
    res.json(order);
});

/* ------------------- DELIVERED ------------------- */
router.put("/deliver/:orderId", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        { status: "delivered" },
        { new: true }
    );
    res.json(order);
});

module.exports = router;
