const itemsModel = require("../../../models/Inventory/itemsModel");
const cartModel = require("../../../models/Sales/cartModel");

const addToCartController = async (req, res) => {
    try {
        const cart = await cartModel.find({ customer_id: req.body.customer_id, item_id: req.body.item_id });
        if (cart.length) {
            const existingQuantity = cart.map((value) => { return (value.quantity) });
            if (req.body.quantity > existingQuantity) {
                const quantityToAdd = req.body.quantity - existingQuantity;
                const item = await itemsModel.findById({ _id: req.body.item_id });
                if (item) {
                    item.opening_stock -= quantityToAdd;
                    await item.save();
                }
            }
            else if (req.body.quantity < existingQuantity) {
                const quantityToSub = existingQuantity - req.body.quantity;
                const item = await itemsModel.findById({ _id: req.body.item_id });
                if (item) {
                    item.opening_stock += quantityToSub;
                    await item.save();
                }
            }
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
            return;
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addToCartController;