const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");
const multer = require("multer");
const router = express.Router();
const JWT_SECRET = "mysecretkey";
const Order = require("../models/Order")

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

        res.json({
            success: true,
            token,
            userType: "restaurant",
            data: restaurant
        });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// -------------------- Get Restaurant by ID --------------------
router.get("/:id", async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.json(restaurant);
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// -------------------- Add Menu Item --------------------
router.post("/:id/menu", upload.single("image"), async (req, res) => {
    try {
        const { name, type, price, cuisine, description } = req.body;

        if (!name || !type || !price || !cuisine) {
            return res.status(400).json({ msg: "All required fields must be filled" });
        }

        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(404).json({ msg: "Restaurant not found" });

        const newItem = {
            name,
            type,
            price: Number(price),
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

        if (name) item.name = name;
        if (type) item.type = type;
        if (price) item.price = Number(price);
        if (cuisine) item.cuisine = cuisine;
        if (description) item.description = description;
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

        const item = restaurant.menu.id(req.params.itemId);
        if (!item) return res.status(404).json({ msg: "Menu item not found" });

        item.deleteOne();
        await restaurant.save();

        res.json({ msg: "Menu item deleted successfully", menu: restaurant.menu });
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});
module.exports = router;

router.get("/dashboard/:restaurantId", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // 1️⃣ Restaurant details
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    // 2️⃣ TOTAL orders count
    const orderCount = await Order.countDocuments({
      restaurantId
    });

    // 3️⃣ Recent orders (last 5)
    const recentOrders = await Order.find({ restaurantId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("customerName total status createdAt");

    // 4️⃣ Today earnings
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await Order.find({
      restaurantId,
      status: "delivered",
      createdAt: { $gte: today }
    });

    const todayEarnings = todayOrders.reduce(
      (sum, order) => sum + order.total,
      0
    );

    // 5️⃣ Ratings count (safe fallback)
    const ratingCount = restaurant.ratings
      ? restaurant.ratings.length
      : 0;

    res.json({
      restaurant,
      stats: {
        menuCount: restaurant.menu.length,
        orderCount,
        ratingCount,
        todayEarnings
      },
      recentOrders
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
});


router.put("/update/:id", upload.single("image"), async (req, res) => {
    try {
        const updateData = req.body;

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json({ success: true, restaurant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Update failed" });
    }
});

module.exports = router;