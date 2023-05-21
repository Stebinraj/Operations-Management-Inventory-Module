const invoicesModel = require("../../../models/Sales/invoicesModel");

const getInvoicedItemsController = async (req, res) => {
    try {
        const data = await invoicesModel.aggregate([
            {
                $lookup: {
                    from: "delivered-items",
                    localField: "delivery_id",
                    foreignField: "_id",
                    as: "delivery_id"
                }
            },
            {
                $unwind: "$delivery_id"
            },
            {
                $lookup: {
                    from: "shipments",
                    localField: "delivery_id.shipments_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "delivery_id.shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "delivery_id.shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    invoiced_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error)
    }
}

module.exports = getInvoicedItemsController