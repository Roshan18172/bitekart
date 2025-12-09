const express = require("express");
const Cart = require("../models/Cart");
const Router = express.Router();

// Get user cart
Router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, items: [] });
  } catch (error) {
    console.error("GET CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Add item to cart
Router.post("/add", async (req, res) => {
  try {
    console.log("Received:", req.body);  // DEBUG

    const { userId, itemId, restaurantId, name, price, image } = req.body;

    if (!userId || !itemId || !restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existing = cart.items.find(i => i.itemId === itemId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({
        itemId,
        restaurantId,
        name,
        price,
        image,
        quantity: 1
      });
    }

    await cart.save();

    res.json({ success: true, message: "Item added to cart", cart });

  } catch (err) {
    console.error("Add Cart Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});


// Update quantity (+ or -)
Router.post("/update", async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ success: false, message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.itemId.toString() === itemId.toString()
    );

    if (!item) {
      return res.json({ success: false, message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (i) => i.itemId.toString() !== itemId.toString()
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error("UPDATE CART ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = Router;
