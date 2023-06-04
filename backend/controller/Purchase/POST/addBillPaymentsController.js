const billPaymentModel = require("../../../models/Purchase/billPaymentsModel");
const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");

const addBillPaymentsController = async (req, res) => {
    try {
        const data = await billPaymentModel.create(req.body);
        const updatePurchaseOrderStatus = await purchaseOrdersModel.findByIdAndUpdate({ _id: req.body.purchased_id }, { $set: { purchase_status: req.body.paid_status } });
        res.send({ success: data, updatePurchaseOrderStatus });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addBillPaymentsController