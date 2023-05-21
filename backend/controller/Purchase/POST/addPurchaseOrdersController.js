const purchaseCartModel = require("../../../models/Purchase/purchaseCartModel");
const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");

const addPurchaseOrdersController = async (req, res) => {
    try {
        const purchaseOrders = await purchaseOrdersModel.insertMany(req.body);
        const deletePurchaseCart = await purchaseCartModel.deleteMany(req.body.delete_purchase_cart_id);
        res.send({ success: purchaseOrders, deletePurchaseCart });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addPurchaseOrdersController;