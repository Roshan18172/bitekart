const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// Get all restaurants (public)
router.get("/all", async (req, res) => {
    try {
        const restaurants = await Restaurant.find().select("-password");
        res.json({ success: true, restaurants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Get single restaurant + menu
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id)
            .populate("menu")   // <---- VERY IMPORTANT
            .select("-password");

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }

        res.json({ success: true, restaurant });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


module.exports = router;
