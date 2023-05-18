const returnsProcessedModel = require("../../../models/Sales/returnsProcessedModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addReturnsProcessedItemsController = async (req, res) => {
    try {
        const data = await returnsProcessedModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.returns_process_status } });
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addReturnsProcessedItemsController