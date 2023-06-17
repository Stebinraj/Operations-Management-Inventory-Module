const mongoose = require('mongoose');

const purchaseCartSchema = mongoose.Schema({
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    purchase_quantity: { type: Number, required: true }
});

const purchaseCartModel = mongoose.model('purchase-carts', purchaseCartSchema);

module.exports = purchaseCartModel;