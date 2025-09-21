const mongoose = require('mongoose');
const { Schema } = mongoose
const UserSchema = new Schema({
    name: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;