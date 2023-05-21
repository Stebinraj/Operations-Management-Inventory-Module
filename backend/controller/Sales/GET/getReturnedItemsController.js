const returnedItemsModel = require("../../../models/Sales/returnedItemsModel");

const getReturnedItemsController = async (req, res) => {
    try {
        const data = await returnedItemsModel.aggregate([
            {
                $lookup: {
                    from: "returns-processeds",
                    localField: "returns_processed_id",
                    foreignField: "_id",
                    as: "returns_processed_id"
                }
            },
            {
                $unwind: "$returns_processed_id"
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "returns_processed_id.payment_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id"
            },
            {
                $lookup: {
                    from: "invoices",
                    localField: "returns_processed_id.payment_id.invoice_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id"
            },
            {
                $lookup: {
                    from: "delivered-items",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id"
            },
            {
                $lookup: {
                    from: "shipments",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    returned_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getReturnedItemsController;