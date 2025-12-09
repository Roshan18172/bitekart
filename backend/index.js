const connectDB = require('./db'); // Import the connectDB function from db.js
connectDB(); // Call the function to establish the database connection
const express = require('express');
var cors=require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
// const mongoose = require('mongoose');
app.get('/', (req, res) => {
    res.send('Welcome to BiteKart Backend!');
    }   );
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use("/uploads", express.static("uploads"));
app.use("/api/auth/users", require('./routes/authUser')); // Use the auth routes for Users
app.use("/api/auth/restaurants", require('./routes/authRestaurant')); // Use the auth routes for Restaurants
app.use("/api/auth/deliveries", require('./routes/authDelivery')); // Use the auth routes for DeliveryPartners
app.use("/api/public/restaurants", require("./routes/restaurantPublicRoutes")); // Public restaurant routes
app.use("/api/cart", require("./routes/cartRoutes")); // Cart routes
app.use("/api/orders", require("./routes/orderRoute")); // Order routes

app.listen(PORT, () => {   
    console.log(`BiteKart Server is running on port http://localhost:${PORT}`);
}); // Start the server and listen on the specified port