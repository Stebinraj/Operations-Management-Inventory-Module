const mongoose = require('mongoose');

const purchaseOrdersSchema = mongoose.Schema({
    purchase_id: { type: String, required: true, unique: true },
    purchase_date: { type: Date, required: true },
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    purchase_status: { type: String, required: true },
    purchased_price_per_item: { type: Number, required: true }
});

const purchaseOrdersModel = mongoose.model('purchase-orders', purchaseOrdersSchema);

module.exports = purchaseOrdersModel;