const itemsModel = require("../../../models/Inventory/itemsModel");
const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");
const receivedPurchaseOrdersModel = require("../../../models/Purchase/receivedPurchaseOrdersModel");

const addReceivedPurchaseOrdersController = async (req, res) => {
    try {
        const data = await receivedPurchaseOrdersModel.create(req.body);
        const updatePurchaseStatus = await purchaseOrdersModel.findByIdAndUpdate({ _id: req.body.purchased_id }, { $set: { purchase_status: req.body.received_status } });
        const updateItemQuantity = await itemsModel.findByIdAndUpdate({ _id: req.body.item_id }, { $inc: { opening_stock: req.body.quantity }, $set: { added_date: new Date() } });
        res.send({ success: data, updatePurchaseStatus, updateItemQuantity });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addReceivedPurchaseOrdersController