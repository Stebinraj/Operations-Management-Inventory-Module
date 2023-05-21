const purchaseCartModel = require("../../../models/Purchase/purchaseCartModel");

const addPurchaseCartController = async (req, res) => {
    try {
        const cart = await purchaseCartModel.find({ item_id: req.body.item_id });
        if (cart.length) {
            const data = await purchaseCartModel.findOneAndUpdate({ item_id: req.body.item_id }, { $set: { purchase_quantity: req.body.purchase_quantity } });
            res.send({ success: data });
            return;
        } else {
            const carts = await purchaseCartModel.create(req.body);
            res.send({ success: carts });
            return;
        }
    } catch (error) {
        res.send(error);
    }
}

module.exports = addPurchaseCartController