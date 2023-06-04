const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");
const vendorCreditModel = require("../../../models/Purchase/vendorCreditsModel");

const addVendorCreditsController = async (req, res) => {
    try {
        const data = await vendorCreditModel.create(req.body);
        const updatePurchaseStatus = await purchaseOrdersModel.findByIdAndUpdate({ _id: req.body.purchased_id }, { $set: { purchase_status: req.body.credit_status } });
        res.send({ success: data, updatePurchaseStatus });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addVendorCreditsController;