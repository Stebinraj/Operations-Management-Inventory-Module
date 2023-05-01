const express = require('express');
const salesOrderModel = require('../../models/Sales/salesOrderModel');
const itemsModel = require('../../models/Inventory/itemsModel');
const cartModel = require('../../models/Sales/cartModel');
const router = express.Router();

router.post('/salesorders', async (req, res) => {
    try {
        const orders = await salesOrderModel.insertMany(req.body);
        const deleteCart = await cartModel.deleteMany(req.body.delete_cart_id);
        res.send({ success: orders, deleteCart });
    } catch (error) {
        res.send(error);
        return;
    }
});

// get sales order
router.get('/salesorder', async (req, res) => {
    const data = await salesOrderModel.find({});
    res.send({ success: data });
})

module.exports = router;