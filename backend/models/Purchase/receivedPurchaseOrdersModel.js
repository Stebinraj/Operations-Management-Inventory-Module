const mongoose = require('mongoose');

const receivedPurchaseOrdersSchema = mongoose.Schema({
    purchased_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    received_date: { type: Date, required: true },
    received_id: { type: String, required: true, unique: true },
});

const receivedPurchaseOrdersModel = mongoose.model('received-purchase-orders', receivedPurchaseOrdersSchema);

module.exports = receivedPurchaseOrdersModel;