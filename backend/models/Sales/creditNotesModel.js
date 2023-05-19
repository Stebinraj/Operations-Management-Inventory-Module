const mongoose = require('mongoose');

const creditsNotesSchema = mongoose.Schema({
    returned_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    credit_id: { type: Number, required: true, unique: true },
    credit_date: { type: Date, required: true }
});

const creditsNotesModel = mongoose.model('credit-notes', creditsNotesSchema);

module.exports = creditsNotesModel;