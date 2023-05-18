const mongoose = require('mongoose');

const returnsProcessedSchema = mongoose.Schema({
    payment_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    returns_process_id: { type: Number, required: true, unique: true },
    returns_process_date: { type: Date, required: true }
});

const returnsProcessedModel = mongoose.model('returns-processeds', returnsProcessedSchema);

module.exports = returnsProcessedModel;