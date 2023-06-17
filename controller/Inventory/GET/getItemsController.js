const itemsModel = require("../../../models/Inventory/itemsModel");

const getItemsController = async (req, res) => {
    try {
        const data = await itemsModel.aggregate([
            {
                $lookup: {
                    from: "item-groups",
                    localField: "item_group_id",
                    foreignField: "_id",
                    as: "item_group_id"
                }
            },
            {
                $unwind: "$item_group_id"
            },
            {
                $lookup: {
                    from: "vendors",
                    localField: "preferred_vendor",
                    foreignField: "_id",
                    as: "preferred_vendor"
                }
            },
            {
                $unwind: "$preferred_vendor"
            },
            {
                $sort: {
                    added_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getItemsController;