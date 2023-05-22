const billPaymentModel = require("../../../models/Purchase/billPaymentsModel");

const getBillPaymentsController = async (req, res) => {
    try {
        const data = await billPaymentModel.aggregate([
            {
                $lookup: {
                    from: "bills",
                    localField: "billed_id",
                    foreignField: "_id",
                    as: "billed_id"
                }
            },
            {
                $unwind: "$billed_id"
            },
            {
                $lookup: {
                    from: "received-purchase-orders",
                    localField: "billed_id.received_order_id",
                    foreignField: "_id",
                    as: "billed_id.received_order_id"
                }
            },
            {
                $unwind: "$billed_id.received_order_id"
            },
            {
                $lookup: {
                    from: "purchase-orders",
                    localField: "billed_id.received_order_id.purchased_id",
                    foreignField: "_id",
                    as: "billed_id.received_order_id.purchased_id"
                }
            },
            {
                $unwind: "$billed_id.received_order_id.purchased_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "billed_id.received_order_id.purchased_id.item_id",
                    foreignField: "_id",
                    as: "billed_id.received_order_id.purchased_id.item_id"
                }
            },
            {
                $unwind: "$billed_id.received_order_id.purchased_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "billed_id.received_order_id.purchased_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "billed_id.received_order_id.purchased_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$billed_id.received_order_id.purchased_id.item_id.item_group_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getBillPaymentsController