const mongoose = require('mongoose');

const packageSchema = mongoose.Schema({
    package_date: { type: Date, required: true },
    packed_id: { type: Number, required: true },
    order_id: { type: mongoose.SchemaTypes.ObjectId, required: true }
});

const packageModel = mongoose.model('packages', packageSchema);

module.exports = packageModel;