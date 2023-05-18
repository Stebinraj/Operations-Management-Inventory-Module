const itemsModel = require("../../../models/Inventory/itemsModel");
const returnedItemsModel = require("../../../models/Sales/returnedItemsModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addReturnedItemsController = async (req, res) => {
    try {
        const data = await returnedItemsModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.returned_status } })
        const updateQuantity = await itemsModel.findByIdAndUpdate({ _id: req.body.item_id }, { $inc: { opening_stock: req.body.quantity } });
        res.send({ success: data, updateOrderStatus, updateQuantity });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addReturnedItemsController