const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");
const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");

const getAdjustmentReportsController = async (req, res) => {
    try {
        const data = await inventoryAdjModel.find({}).populate({
            path: 'item_id',
            model: itemsModel,
            populate: {
                path: 'item_group_id',
                model: itemsGroupModel
            }
        });
        res.send({ success: data })
    } catch (error) {
        res.send(error);
    }
}

module.exports = getAdjustmentReportsController