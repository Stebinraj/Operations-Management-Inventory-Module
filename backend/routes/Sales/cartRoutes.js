const express = require('express');
const cartModel = require('../../models/Sales/cartModel');
const router = express.Router();

router.post('/cart', async (req, res) => {
    const cart = await cartModel.find({ customer_id: req.body.customer_id, item_id: req.body.item_id });
    if (cart.length) {
        const data = await cartModel.findOneAndUpdate({ customer_id: req.body.customer_id, item_id: req.body.item_id }, req.body);
        res.send({ success: data });
        return;
    } else {
        const cart = new cartModel(req.body);
        const data = await cart.save();
        res.send({ success: data });
        return;
    }
});

router.get('/cart', async (req, res) => {
    const data = await cartModel.find({});
    res.send({ success: data });
})

module.exports = router;