const itemsModel = require("../../../models/Inventory/itemsModel");
const cartModel = require("../../../models/Sales/cartModel");

const deleteCartController = async (req, res) => {
    try {
        const cart = await cartModel.findByIdAndDelete({ _id: req.body.id });
        if (cart) {
            const item = await itemsModel.findById({ _id: cart.item_id });
            if (item) {
                item.opening_stock += cart.quantity;
                await item.save();
            }
        }
        res.send({ success: cart });
    } catch (error) {
        res.send(error);
    }

}

module.exports = deleteCartController