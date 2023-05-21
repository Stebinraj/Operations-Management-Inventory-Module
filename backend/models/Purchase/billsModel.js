const mongoose = require('mongoose');

const billsSchema = mongoose.Schema({
    received_order_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    bill_id: { type: Number, required: true, unique: true },
    bill_date: { type: Date, required: true }
});

const billsModel = mongoose.model('bills', billsSchema);

module.exports = billsModel;