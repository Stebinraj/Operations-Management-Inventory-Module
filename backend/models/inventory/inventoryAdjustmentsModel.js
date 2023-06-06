const mongoose = require('mongoose');

const inventoryAdjSchema = mongoose.Schema({
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    quantity: { type: Number },
    value: { type: Number },
    mode_of_adjustment: { type: String, required: true },
    reference_number: { type: String, unique: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    description: { type: String },
});

const inventoryAdjModel = mongoose.model('inventory-adjustments', inventoryAdjSchema);

module.exports = inventoryAdjModel;