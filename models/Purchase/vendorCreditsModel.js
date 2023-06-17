const mongoose = require('mongoose');

const vendorCreditSchema = mongoose.Schema({
    payment_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    credit_id: { type: String, required: true, unique: true },
    credit_date: { type: Date, required: true }
});

const vendorCreditModel = mongoose.model('vendor-credits', vendorCreditSchema);

module.exports = vendorCreditModel;