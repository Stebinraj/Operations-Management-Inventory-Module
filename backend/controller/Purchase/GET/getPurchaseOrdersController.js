const purchaseOrdersModel = require("../../../models/Purchase/purchaseOrdersModel");

const getPurchaseOrdersController = async (req, res) => {
    try {
        const data = await purchaseOrdersModel.aggregate([
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
                $lookup: {
                    from: "vendors",
                    localField: "item_id.preferred_vendor",
                    foreignField: "_id",
                    as: "item_id.preferred_vendor"
                }
            },
            {
                $unwind: "$item_id.preferred_vendor"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getPurchaseOrdersController;