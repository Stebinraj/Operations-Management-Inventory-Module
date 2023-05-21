const receivedPurchaseOrdersModel = require("../../../models/Purchase/receivedPurchaseOrdersModel");

const getReceivedPurchaseOrdersController = async (req, res) => {
    try {
        const data = await receivedPurchaseOrdersModel.aggregate([
            {
                $lookup: {
                    from: "purchase-orders",
                    localField: "purchased_id",
                    foreignField: "_id",
                    as: "purchased_id"
                }
            },
            {
                $unwind: "$purchased_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "purchased_id.item_id",
                    foreignField: "_id",
                    as: "purchased_id.item_id"
                }
            },
            {
                $unwind: "$purchased_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "purchased_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "purchased_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$purchased_id.item_id.item_group_id"
            }
        ]);
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getReceivedPurchaseOrdersController