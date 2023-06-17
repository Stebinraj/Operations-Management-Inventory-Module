const billsModel = require("../../../models/Purchase/billsModel");

const getBillsController = async (req, res) => {
    try {
        const data = await billsModel.aggregate([
            {
                $lookup: {
                    from: "received-purchase-orders",
                    localField: "received_order_id",
                    foreignField: "_id",
                    as: "received_order_id"
                }
            },
            {
                $unwind: "$received_order_id"
            },
            {
                $lookup: {
                    from: "purchase-orders",
                    localField: "received_order_id.purchased_id",
                    foreignField: "_id",
                    as: "received_order_id.purchased_id"
                }
            },
            {
                $unwind: "$received_order_id.purchased_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "received_order_id.purchased_id.item_id",
                    foreignField: "_id",
                    as: "received_order_id.purchased_id.item_id"
                }
            },
            {
                $unwind: "$received_order_id.purchased_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "received_order_id.purchased_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "received_order_id.purchased_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$received_order_id.purchased_id.item_id.item_group_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getBillsController