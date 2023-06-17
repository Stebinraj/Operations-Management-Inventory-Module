const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");

const getAdjustmentReportsController = async (req, res) => {
    try {
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
            },
            {
                $sort: {
                    date: -1
                }
            }
        ]);
        res.send({ success: data })
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getAdjustmentReportsController