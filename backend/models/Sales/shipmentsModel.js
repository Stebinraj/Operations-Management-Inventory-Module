const mongoose = require('mongoose');

const shipmentSchema = mongoose.Schema({
    delivery_challans_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    shipment_date: { type: Date, required: true },
    shipped_id: { type: Number, required: true, unique: true }
});

const shipmentModel = mongoose.model('shipments', shipmentSchema);

module.exports = shipmentModel;