const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const multer = require("multer");
const router = express.Router();
const JWT_SECRET = "mysecretkey";

// -------------------- Multer Config --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

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

// -------------------- Get Restaurant by ID --------------------
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// -------------------- Add Menu Item --------------------
router.post("/:id/menu", upload.single("image"), async (req, res) => {
    try {
        const { name, type, price, cuisine, description } = req.body;
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        const newItem = {
            name,
            type,
            price,
            cuisine,
            description,
            image: req.file ? req.file.filename : null,
        };

        restaurant.menu.push(newItem);
        await restaurant.save();
        res.json({ msg: "Menu item added successfully", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// -------------------- Edit Menu Item --------------------
router.put("/:id/menu/:itemId", upload.single("image"), async (req, res) => {
    try {
        const { name, type, price, cuisine, description } = req.body;
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        const item = restaurant.menu.id(req.params.itemId);
        if (!item) return res.status(404).json({ msg: "Menu item not found" });

        item.name = name || item.name;
        item.type = type || item.type;
        item.price = price || item.price;
        item.cuisine = cuisine || item.cuisine;
        item.description = description || item.description;
        if (req.file) item.image = req.file.filename;

        await restaurant.save();
        res.json({ msg: "Menu item updated successfully", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// -------------------- Delete Menu Item --------------------
router.delete("/:id/menu/:itemId", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        restaurant.menu = restaurant.menu.filter((item) => item._id.toString() !== req.params.itemId);
        await restaurant.save();
        res.json({ msg: "Menu item deleted successfully", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

module.exports = router;
