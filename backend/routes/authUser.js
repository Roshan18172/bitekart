const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "mysecretkey";
// Register User
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword, phone, address });
        await user.save();

        const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
});

// Login User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: "user" },
            JWT_SECRET,
            { expiresIn: "2h" }
        );

        return res.json({
            success: true,
            msg: "Login Successful",
            token,
            userType: "user",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server Error" });
    }
});


module.exports = router;
