const mongoose = require("mongoose");

const DeliveryPartnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String},
    vehicleType: { type: String }, // bike, scooter, car
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const Delivery = mongoose.model("DeliveryPartner", DeliveryPartnerSchema);
module.exports = Delivery;
