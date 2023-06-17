const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");

const getDeliveredItemsController = async (req, res) => {
    try {
        const data = await deliveredItemsModel.aggregate([
            {
                $lookup: {
                    from: "shipments",
                    localField: "shipments_id",
                    foreignField: "_id",
                    as: "shipments_id"
                }
            },
            {
                $unwind: "$shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    delivery_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getDeliveredItemsController