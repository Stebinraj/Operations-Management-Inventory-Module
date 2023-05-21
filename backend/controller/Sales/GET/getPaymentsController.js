const paymentModel = require("../../../models/Sales/paymentsModel");

const getPaymentsController = async (req, res) => {
    try {
        const data = await paymentModel.aggregate([
            {
                $lookup: {
                    from: "invoices",
                    localField: "invoice_id",
                    foreignField: "_id",
                    as: "invoice_id"
                }
            },
            {
                $unwind: "$invoice_id"
            },
            {
                $lookup: {
                    from: "delivered-items",
                    localField: "invoice_id.delivery_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id"
            },
            {
                $lookup: {
                    from: "shipments",
                    localField: "invoice_id.delivery_id.shipments_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id"
            },
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$invoice_id.delivery_id.shipments_id.delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    paid_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getPaymentsController