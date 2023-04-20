const mongoose = require('mongoose');

const inventoryAdjSchema = mongoose.Schema({
    mode_of_adjustment: { type: String, required: true },
    reference_number: { type: String, unique: true },
    date: { type: Date, required: true },
    reason: { type: String, required: true },
    description: { type: String },
    item_details: { type: mongoose.SchemaTypes.ObjectId, required: true }
});

const inventoryAdjModel = mongoose.model('inventory-adjustments', inventoryAdjSchema);

module.exports = inventoryAdjModel;