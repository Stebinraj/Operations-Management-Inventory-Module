const billsModel = require("../../../models/Purchase/billsModel");
const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");

const addBillsController = async (req, res) => {
    try {
        const data = await billsModel.create(req.body);
        const updatePurchaseStatus = await purchaseOrdersModel.findByIdAndUpdate({ _id: req.body.purchased_id }, { $set: { purchase_status: req.body.bill_status } });
        res.send({ success: data, updatePurchaseStatus });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addBillsController