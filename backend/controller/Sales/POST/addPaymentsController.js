const paymentModel = require("../../../models/Sales/paymentsModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addPaymentsController = async (req, res) => {
    try {
        const data = await paymentModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.payment_status } })
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error)
    }
}

module.exports = addPaymentsController