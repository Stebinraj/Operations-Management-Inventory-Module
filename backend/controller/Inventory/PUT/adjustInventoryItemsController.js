const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");
const itemsModel = require("../../../models/Inventory/itemsModel");

const adjustInventoryItemsController = async (req, res) => {
    try {
        const adjustments = new inventoryAdjModel(req.body);
        const items = await itemsModel.findById(req.params.id);
        if (req.body.quantity) {
            await itemsModel.findByIdAndUpdate(items._id, { $inc: { opening_stock: req.body.quantity } });
            await adjustments.save();
            res.send({ success: adjustments, items });
        }
        else if (req.body.value) {
            await itemsModel.findByIdAndUpdate(items._id, { $inc: { selling_price: req.body.value } });
            await adjustments.save();
            res.send({ success: adjustments, items });
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = adjustInventoryItemsController