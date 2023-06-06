const mongoose = require('mongoose');

const salesOrderSchema = mongoose.Schema({
    ordered_id: { type: String, required: true, unique: true },
    order_date: { type: String, required: true },
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    order_status: { type: String, required: true },
    ordered_price_per_item: { type: Number, required: true },
});

const salesOrderModel = mongoose.model('salesorders', salesOrderSchema);

module.exports = salesOrderModel;