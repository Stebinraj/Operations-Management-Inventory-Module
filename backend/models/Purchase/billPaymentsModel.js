const mongoose = require('mongoose');

const billPaymentSchema = mongoose.Schema({
    billed_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    paid_date: { type: Date, required: true },
    paid_id: { type: Number, required: true, unique: true }
});

const billPaymentModel = mongoose.model('bill-payments', billPaymentSchema);

module.exports = billPaymentModel;