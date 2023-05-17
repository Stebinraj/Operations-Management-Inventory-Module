const mongoose = require('mongoose');

const invoicesSchema = mongoose.Schema({
    delivery_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    invoiced_id: { type: Number, required: true, unique: true },
    invoiced_date: { type: Date, required: true }
});

const invoicesModel = mongoose.model('invoices', invoicesSchema);

module.exports = invoicesModel;