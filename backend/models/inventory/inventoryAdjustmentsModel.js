const mongoose = require('mongoose');

const inventoryAdjSchema = mongoose.Schema({
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    item_name: { type: String, required: true },
    quantity: { type: String },
    value: { type: String },
    mode_of_adjustment: { type: String, required: true },
    reference_number: { type: String, unique: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    description: { type: String },
});

const inventoryAdjModel = mongoose.model('inventory-adjustments', inventoryAdjSchema);

module.exports = inventoryAdjModel;