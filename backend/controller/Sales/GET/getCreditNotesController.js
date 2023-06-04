const creditsNotesModel = require("../../../models/Sales/creditNotesModel");

const getCreditNotesController = async (req, res) => {
    try {
        const data = await creditsNotesModel.aggregate([
            {
                $lookup: {
                    from: "returned-items",
                    localField: "returned_id",
                    foreignField: "_id",
                    as: "returned_id"
                }
            },
            {
                $unwind: "$returned_id"
            },
            {
                $lookup: {
                    from: "returns-processeds",
                    localField: "returned_id.returns_processed_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id"
            },
            {
                $lookup: {
                    from: "payments",
                    localField: "returned_id.returns_processed_id.payment_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id"
            },
            {
                $lookup: {
                    from: "invoices",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id"
            },
            {
                $lookup: {
                    from: "delivered-items",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id"
            },
            {
                $lookup: {
                    from: "shipments",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$returned_id.returns_processed_id.payment_id.invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    credit_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = getCreditNotesController