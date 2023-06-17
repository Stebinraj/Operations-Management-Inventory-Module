const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
    item_group_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    item_name: { type: String, required: true },
    unit: { type: String, required: true },
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
    weight: { type: Number, required: true },
    manufacturer: { type: String, required: true },
    brand: { type: String, required: true },
    selling_price: { type: Number, required: true },
    cost_price: { type: Number, required: true },
    description: { type: String },
    opening_stock: { type: Number, required: true },
    reorder_point: { type: Number, required: true },
    preferred_vendor: { type: mongoose.SchemaTypes.ObjectId, required: true },
    image_of_item: { type: String },
    added_date: { type: Date, required: true }
});

const itemsModel = mongoose.model('items', itemsSchema);

module.exports = itemsModel;