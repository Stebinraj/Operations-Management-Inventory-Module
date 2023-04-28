const mongoose = require('mongoose');

const salesOrderSchema = mongoose.Schema({
    date: { type: String, required: true },
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    customer_phone_number: { type: String, required: true },
    customer_billing_address: { type: String, required: true },
    item_group: { type: String, required: true },
    item_group_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    item_name: { type: String, required: true },
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    selling_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true },
    status: { type: String, required: true }
});

const salesOrderModel = mongoose.model('salesorders', salesOrderSchema);

module.exports = salesOrderModel;