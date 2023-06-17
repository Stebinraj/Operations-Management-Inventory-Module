const cartModel = require("../../../models/Sales/cartModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const placeOrderController = async (req, res) => {
    try {
        const orders = await salesOrderModel.insertMany(req.body);
        const deleteCart = await cartModel.deleteMany(req.body.delete_cart_id);

        res.send({ success: orders, deleteCart });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = placeOrderController;