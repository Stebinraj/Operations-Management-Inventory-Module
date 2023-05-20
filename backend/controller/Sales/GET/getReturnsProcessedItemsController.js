const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const invoicesModel = require("../../../models/Sales/invoicesModel");
const packageModel = require("../../../models/Sales/packageModel");
const paymentModel = require("../../../models/Sales/paymentsModel");
const returnsProcessedModel = require("../../../models/Sales/returnsProcessedModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getReturnsProcessedItemsController = async (req, res) => {
    try {
        // populate method

        // const data = await returnsProcessedModel.find({}).populate([
        //     {
        //         path: 'payment_id',
        //         model: paymentModel,
        //         populate: {
        //             path: 'invoice_id',
        //             model: invoicesModel,
        //             populate: {
        //                 path: 'delivery_id',
        //                 model: deliveredItemsModel,
        //                 populate: {
        //                     path: 'shipments_id',
        //                     model: shipmentModel,
        //                     populate: {
        //                         path: 'delivery_challans_id',
        //                         model: deliveryChallansModel,
        //                         populate: {
        //                             path: 'package_id',
        //                             model: packageModel,
        //                             populate: {
        //                                 path: 'order_id',
        //                                 model: salesOrderModel,
        //                                 populate: [
        //                                     {
        //                                         path: 'customer_id',
        //                                         model: customerModel,
        //                                     },
        //                                     {
        //                                         path: 'item_id',
        //                                         model: itemsModel,
        //                                         populate: {
        //                                             path: 'item_group_id',
        //                                             model: itemsGroupModel,
        //                                         }
        //                                     }
        //                                 ]
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ]);

        // aggregate method

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