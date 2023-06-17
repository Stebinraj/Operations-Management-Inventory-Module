const mongoose = require('mongoose');

const deliveryChallansSchema = mongoose.Schema({
    package_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    challan_id: { type: String, required: true, unique: true },
    challan_date: { type: Date, required: true }
});

const deliveryChallansModel = mongoose.model('delivery-challans', deliveryChallansSchema);

module.exports = deliveryChallansModel;