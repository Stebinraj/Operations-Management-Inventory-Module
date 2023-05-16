const mongoose = require('mongoose');

const deliveredItemsSchema = mongoose.Schema({
    delivery_date: { type: Date, required: true },
    delivered_id: { type: Number, required: true, unique: true },
    shipments_id: { type: mongoose.SchemaTypes.ObjectId, required: true }
});

const deliveredItemsModel = mongoose.model('delivered-items', deliveredItemsSchema);

module.exports = deliveredItemsModel;