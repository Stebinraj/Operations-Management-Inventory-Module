const returnsProcessedModel = require("../../../models/Sales/returnsProcessedModel");

const getReturnsProcessedItemsController = async (req, res) => {
    try {
        const data = await returnsProcessedModel.aggregate([
            {
                $lookup: {
                    from: "payments",
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
                    from: "invoices",
                    localField: "payment_id.invoice_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id"
            },
            {
                $lookup: {
                    from: "delivered-items",
                    localField: "payment_id.invoice_id.delivery_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id"
            },
            {
                $lookup: {
                    from: "shipments",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    returns_process_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error)
    }
}

module.exports = getReturnsProcessedItemsController