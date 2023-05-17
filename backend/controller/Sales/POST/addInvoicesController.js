const invoicesModel = require("../../../models/Sales/invoicesModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addInvoicesController = async (req, res) => {
    try {
        const data = await invoicesModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.invoice_status } });
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addInvoicesController