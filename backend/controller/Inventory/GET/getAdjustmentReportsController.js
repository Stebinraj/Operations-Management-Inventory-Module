const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");
const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");

const getAdjustmentReportsController = async (req, res) => {
    try {
        // populate method

        // const data = await inventoryAdjModel.find({}).populate({
        //     path: 'item_id',
        //     model: itemsModel,
        //     populate: {
        //         path: 'item_group_id',
        //         model: itemsGroupModel
        //     }
        // });

        // aggregate method

        const data = await inventoryAdjModel.aggregate([
            {
                $lookup: {
                    from: "items",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "item_id"
                }
            },
            {
                $unwind: "$item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "item_id.item_group_id",
                    foreignField: "_id",
                    as: "item_id.item_group_id"
                }
            },
            {
                $unwind: "$item_id.item_group_id"
            }
        ]);
        res.send({ success: data })
    } catch (error) {
        res.send(error);
    }
}

module.exports = getAdjustmentReportsController