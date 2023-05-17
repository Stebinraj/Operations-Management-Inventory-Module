const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    invoice_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    paid_id: { type: Number, required: true, unique: true },
    paid_date: { type: Date, required: true }
});

const paymentModel = mongoose.model('payments', paymentSchema);

module.exports = paymentModel;