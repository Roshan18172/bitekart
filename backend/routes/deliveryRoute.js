const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const DeliveryPartner = require("../models/DeliveryPartner");


router.get("/available-orders", async (req, res) => {
    try {
        const orders = await Order.find({
            status: "ready_for_pickup",
            $or: [
                { deliveryPartnerId: null },
                { deliveryPartnerId: { $exists: false } }
            ]
        })
            .populate("userId", "name phone address")
            .sort({ createdAt: 1 });

        res.json({ success: true, orders });

    } catch (err) {
        console.error("AVAILABLE ORDERS ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
});


router.put("/accept-order", async (req, res) => {
    try {
        const { orderId, partnerId } = req.body;

        const partner = await DeliveryPartner.findById(partnerId);
        if (!partner || !partner.isAvailable) {
            return res.status(400).json({ msg: "Partner not available" });
        }

        if (partner.activeOrderId) {
            return res.status(400).json({ msg: "You already have an active order" });
        }

        // Atomic check (IMPORTANT)
        const order = await Order.findOneAndUpdate(
            {
                _id: orderId,
                status: "ready_for_pickup",
                deliveryPartnerId: null
            },
            {
                status: "assigned",
                deliveryPartnerId: partnerId
            },
            { new: true }
        );

        if (!order) {
            return res.status(400).json({ msg: "Order already taken" });
        }

        partner.activeOrderId = order._id;
        partner.isAvailable = false;
        await partner.save();

        res.json({ success: true, msg: "Order accepted", order });

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});


/* ------------------- UPDATE DELIVERY STATUS ------------------- */
router.put("/update-status/:orderId", async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        // When delivered → free partner + add earnings
        if (status === "delivered") {
            const partner = await DeliveryPartner.findById(order.deliveryPartnerId);

            if (partner) {
                partner.isAvailable = true;
                partner.activeOrderId = null;
                partner.earnings += 50; // delivery fee
                await partner.save();
            }
        }

        res.json({ success: true, order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get("/active-order/:partnerId", async (req, res) => {
    try {
        const order = await Order.findOne({
            deliveryPartnerId: req.params.partnerId,
            status: { $ne: "delivered" }
        }).populate("userId", "name phone address");

        res.json(order);
    } catch (err) {
        console.error("ACTIVE ORDER ERROR:", err);
        res.status(500).json({ msg: "Server error" });
    }
});


router.post("/assign-order", async (req, res) => {
    try {
        const { orderId, partnerId } = req.body;

        const partner = await DeliveryPartner.findById(partnerId);
        if (!partner || !partner.isAvailable) {
            return res.status(400).json({ msg: "Delivery partner not available" });
        }

        if (partner.activeOrderId) {
            return res.status(400).json({ msg: "Partner already has an active order" });
        }

        const order = await Order.findById(orderId);
        if (!order || order.status !== "ready_for_pickup") {
            return res.status(400).json({ msg: "Order not ready for pickup" });
        }

        // Assign
        order.deliveryPartnerId = partner._id;
        order.status = "assigned_to_delivery";
        await order.save();

        partner.activeOrderId = order._id;
        partner.isAvailable = false;
        await partner.save();

        res.json({ success: true, msg: "Order assigned successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

router.get("/earnings/:partnerId", async (req, res) => {
    try {
        const partner = await DeliveryPartner.findById(req.params.partnerId)
            .select("earnings name");

        if (!partner) {
            return res.status(404).json({ msg: "Partner not found" });
        }

        res.json({
            success: true,
            earnings: partner.earnings,
            partnerName: partner.name
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;