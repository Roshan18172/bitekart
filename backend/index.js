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
app.use("/api/auth", require('./routes/auth')); // Use the auth routes

app.listen(PORT, () => {   
    console.log(`myNotebook Server is running on port http://localhost:${PORT}`);
}); // Start the server and listen on the specified port