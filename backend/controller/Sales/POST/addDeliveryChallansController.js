const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addDeliveryChallansController = async (req, res) => {
    try {
        const data = await deliveryChallansModel.create(req.body);
        const updateSalesOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.challan_status } })
        res.send({ success: data, updateSalesOrderStatus });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addDeliveryChallansController;