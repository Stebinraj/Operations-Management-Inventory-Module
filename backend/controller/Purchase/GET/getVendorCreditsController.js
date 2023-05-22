const vendorCreditModel = require("../../../models/Purchase/vendorCreditsModel");

const getVendorCreditsController = async (req, res) => {
    try {
        const data = await vendorCreditModel.aggregate([
            {
                $lookup: {
                    from: "bill-payments",
                    localField: "payment_id",
                    foreignField: "_id",
                    as: "payment_id"
                }
            },
            {
                $unwind: "$payment_id"
            },
            {
                $lookup: {
                    from: "bills",
                    localField: "payment_id.billed_id",
                    foreignField: "_id",
                    as: "payment_id.billed_id"
                }
            },
            {
                $unwind: "$payment_id.billed_id"
            },
            {
                $lookup: {
                    from: "received-purchase-orders",
                    localField: "payment_id.billed_id.received_order_id",
                    foreignField: "_id",
                    as: "payment_id.billed_id.received_order_id"
                }
            },
            {
                $unwind: "$payment_id.billed_id.received_order_id"
            },
            {
                $lookup: {
                    from: "purchase-orders",
                    localField: "payment_id.billed_id.received_order_id.purchased_id",
                    foreignField: "_id",
                    as: "payment_id.billed_id.received_order_id.purchased_id"
                }
            },
            {
                $unwind: "$payment_id.billed_id.received_order_id.purchased_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "payment_id.billed_id.received_order_id.purchased_id.item_id",
                    foreignField: "_id",
                    as: "payment_id.billed_id.received_order_id.purchased_id.item_id"
                }
            },
            {
                $unwind: "$payment_id.billed_id.received_order_id.purchased_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "payment_id.billed_id.received_order_id.purchased_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "payment_id.billed_id.received_order_id.purchased_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$payment_id.billed_id.received_order_id.purchased_id.item_id.item_group_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getVendorCreditsController