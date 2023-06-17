const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true }
});

const vendorModel = mongoose.model('vendors', vendorSchema);

module.exports = vendorModel;