const mongoose = require('mongoose');

const returnedItemsSchema = mongoose.Schema({
    returns_processed_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    returned_id: { type: Number, required: true, unique: true },
    returned_date: { type: Date, required: true }
});

const returnedItemsModel = mongoose.model('returned-items', returnedItemsSchema);

module.exports = returnedItemsModel;