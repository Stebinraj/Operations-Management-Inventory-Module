const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const invoicesModel = require("../../../models/Sales/invoicesModel");
const packageModel = require("../../../models/Sales/packageModel");
const paymentModel = require("../../../models/Sales/paymentsModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getPaymentsController = async (req, res) => {
    try {
        // populate method

        // const data = await paymentModel.find({}).populate([
        //     {
        //         path: 'invoice_id',
        //         model: invoicesModel,
        //         populate: {
        //             path: 'delivery_id',
        //             model: deliveredItemsModel,
        //             populate: {
        //                 path: 'shipments_id',
        //                 model: shipmentModel,
        //                 populate: {
        //                     path: 'delivery_challans_id',
        //                     model: deliveryChallansModel,
        //                     populate: {
        //                         path: 'package_id',
        //                         model: packageModel,
        //                         populate: {
        //                             path: 'order_id',
        //                             model: salesOrderModel,
        //                             populate: [
        //                                 {
        //                                     path: 'customer_id',
        //                                     model: customerModel,
        //                                 },
        //                                 {
        //                                     path: 'item_id',
        //                                     model: itemsModel,
        //                                     populate: {
        //                                         path: 'item_group_id',
        //                                         model: itemsGroupModel,
        //                                     }
        //                                 }
        //                             ]
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ]);

        // aggregate method

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
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getPaymentsController