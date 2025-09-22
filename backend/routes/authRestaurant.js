const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");

const router = express.Router();
const JWT_SECRET = "mysecretkey";
// Register Restaurant
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, address, cuisine } = req.body;

        let restaurant = await Restaurant.findOne({ email });
        if (restaurant) return res.status(400).json({ msg: "Restaurant already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        restaurant = new Restaurant({ name, email, password: hashedPassword, phone, address, cuisine });
        await restaurant.save();

        const token = jwt.sign({ id: restaurant._id, role: "restaurant" }, JWT_SECRET);
        res.json({ token, restaurant });
    } catch (err) {
        console.error("❌ Error in Restaurant Register:", err); // full object
        res.status(500).json({ msg: "Server Error", error: err.message, stack: err.stack });
    }
});


// Login Restaurant
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let restaurant = await Restaurant.findOne({ email });
        if (!restaurant) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, restaurant.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: restaurant._id, role: "restaurant" }, JWT_SECRET, { expiresIn: "20h" });

        res.json({ token, restaurant });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

module.exports = router;
