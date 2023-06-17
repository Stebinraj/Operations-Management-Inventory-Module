const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    item_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    customer_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    quantity: { type: Number, required: true }
});

const cartModel = mongoose.model('carts', cartSchema);

module.exports = cartModel;