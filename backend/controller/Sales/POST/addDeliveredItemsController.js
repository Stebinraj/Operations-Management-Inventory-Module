const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addDeliveredItemsController = async (req, res) => {
    try {
        const data = await deliveredItemsModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.delivery_status } })
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addDeliveredItemsController