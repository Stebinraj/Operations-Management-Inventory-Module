const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const creditsNotesModel = require("../../../models/Sales/creditNotesModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveredItemsModel = require("../../../models/Sales/deliveredItemsModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const invoicesModel = require("../../../models/Sales/invoicesModel");
const packageModel = require("../../../models/Sales/packageModel");
const paymentModel = require("../../../models/Sales/paymentsModel");
const returnedItemsModel = require("../../../models/Sales/returnedItemsModel");
const returnsProcessedModel = require("../../../models/Sales/returnsProcessedModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getCreditNotesController = async (req, res) => {
    try {
        // populate method

        // const data = await creditsNotesModel.find({}).populate([
        //     {
        //         path: 'returned_id',
        //         model: returnedItemsModel,
        //         populate: {
        //             path: 'returns_processed_id',
        //             model: returnsProcessedModel,
        //             populate: {
        //                 path: 'payment_id',
        //                 model: paymentModel,
        //                 populate: {
        //                     path: 'invoice_id',
        //                     model: invoicesModel,
        //                     populate: {
        //                         path: 'delivery_id',
        //                         model: deliveredItemsModel,
        //                         populate: {
        //                             path: 'shipments_id',
        //                             model: shipmentModel,
        //                             populate: {
        //                                 path: 'delivery_challans_id',
        //                                 model: deliveryChallansModel,
        //                                 populate: {
        //                                     path: 'package_id',
        //                                     model: packageModel,
        //                                     populate: {
        //                                         path: 'order_id',
        //                                         model: salesOrderModel,
        //                                         populate: [
        //                                             {
        //                                                 path: 'customer_id',
        //                                                 model: customerModel,
        //                                             },
        //                                             {
        //                                                 path: 'item_id',
        //                                                 model: itemsModel,
        //                                                 populate: {
        //                                                     path: 'item_group_id',
        //                                                     model: itemsGroupModel,
        //                                                 }
        //                                             }
        //                                         ]
        //                                     }
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // ]);

        // aggregate methood

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
        res.send(error)
    }
}

module.exports = getCreditNotesController