const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const addShipmentsController = async (req, res) => {
    try {
        const data = await shipmentModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.shipping_status } })
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addShipmentsController