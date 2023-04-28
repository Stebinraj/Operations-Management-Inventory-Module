const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    phone_number: { type: Number, required: true },
    billing_address: { type: String, required: true }
});

const customerModel = mongoose.model('customers', customerSchema);

module.exports = customerModel;