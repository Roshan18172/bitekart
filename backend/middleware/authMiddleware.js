const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const DeliveryPartner = require("../models/DeliveryPartner");
const JWT_SECRET = "mysecretkey";

const authMiddleware = (roles = []) => {
    // roles can be "user", "restaurant", "delivery" or an array of them
    if (typeof roles === "string") {
        roles = [roles];
    }

    return async (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded; // { id, role }

            // ✅ Role check
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ msg: "Access denied: Insufficient role" });
            }

            // ✅ Fetch full user details based on role
            let userDetails = null;
            if (decoded.role === "user") {
                userDetails = await User.findById(decoded.id).select("-password");
            } else if (decoded.role === "restaurant") {
                userDetails = await Restaurant.findById(decoded.id).select("-password");
            } else if (decoded.role === "delivery") {
                userDetails = await DeliveryPartner.findById(decoded.id).select("-password");
            }

            if (!userDetails) {
                return res.status(404).json({ msg: "User not found" });
            }

            req.userDetails = userDetails; // attach full data
            next();
        } catch (err) {
            res.status(401).json({ msg: "Invalid token" });
        }
    };
};

module.exports = authMiddleware;
