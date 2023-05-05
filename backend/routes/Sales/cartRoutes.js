const express = require('express');
const cartModel = require('../../models/Sales/cartModel');
const itemsModel = require('../../models/Inventory/itemsModel');
const itemsGroupModel = require('../../models/Inventory/itemsGroupModel');
const customerModel = require('../../models/Sales/customersModel');
const router = express.Router();

router.post('/cart', async (req, res) => {
    const cart = await cartModel.find({ customer_id: req.body.customer_id, item_id: req.body.item_id });
    if (cart.length) {
        const data = await cartModel.findOneAndUpdate({ customer_id: req.body.customer_id, item_id: req.body.item_id }, req.body);
        res.send({ success: data });
        return;
    } else {
        const carts = await cartModel(req.body);
        const item = await itemsModel.findById({ _id: carts.item_id });
        if (item) {
            await carts.save();
            item.opening_stock -= carts.quantity;
            await item.save();
        }
        res.send({ success: carts, item });
    }
});

router.get('/cart', async (req, res) => {
    const data = await cartModel.find({}).populate([
        {
            path: 'item_id',
            model: itemsModel,
            populate: {
                path: 'item_group_id',
                model: itemsGroupModel
            }
        },
        {
            path: 'customer_id',
            model: customerModel
        }
    ]);
    res.send({ success: data });
});

router.delete('/cart', async (req, res) => {
    // const data = await cartModel.findByIdAndDelete({ _id: req.body.id });
    const cart = await cartModel.findByIdAndDelete({ _id: req.body.id });
    if (cart) {
        const item = await itemsModel.findById({ _id: cart.item_id });
        if (item) {
            item.opening_stock += cart.quantity;
            await item.save();
        }
    }
    res.send({ success: cart });
});

router.post('/cart', async (req, res) => {
    const cart = await cartModel.find({ customer_id: req.body.customer_id, item_id: req.body.item_id });
    if (cart.length) {
        const data = await cartModel.findOneAndUpdate({ customer_id: req.body.customer_id, item_id: req.body.item_id }, req.body);
        res.send({ success: data });
        return;
    } else {
        const carts = await cartModel(req.body);
        const item = await itemsModel.findById({ _id: carts.item_id });
        if (item) {
            await carts.save();
            item.opening_stock -= carts.quantity;
            await item.save();
        }
        res.send({ success: carts, item });
    }
});


module.exports = router;