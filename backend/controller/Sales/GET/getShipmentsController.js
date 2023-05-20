const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const packageModel = require("../../../models/Sales/packageModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const shipmentModel = require("../../../models/Sales/shipmentsModel");

const getShipmentsController = async (req, res) => {
    try {
        // populate method

        // const data = await shipmentModel.find({}).populate([
        //     {
        //         path: 'delivery_challans_id',
        //         model: deliveryChallansModel,
        //         populate: [
        //             {
        //                 path: 'package_id',
        //                 model: packageModel,
        //                 populate: [
        //                     {
        //                         path: 'order_id',
        //                         model: salesOrderModel,
        //                         populate: [
        //                             {
        //                                 path: 'customer_id',
        //                                 model: customerModel
        //                             },
        //                             {
        //                                 path: 'item_id',
        //                                 model: itemsModel,
        //                                 populate: [{
        //                                     path: 'item_group_id',
        //                                     model: itemsGroupModel
        //                                 }]
        //                             }
        //                         ]
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // ])

        // aggregate method

        const data = await shipmentModel.aggregate([
            {
                $lookup: {
                    from: "delivery-challans",
                    localField: "delivery_challans_id",
                    foreignField: "_id",
                    as: "delivery_challans_id"
                }
            },
            {
                $unwind: "$delivery_challans_id"
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "delivery_challans_id.package_id",
                    foreignField: "_id",
                    as: "delivery_challans_id.package_id"
                }
            },
            {
                $unwind: "$delivery_challans_id.package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "delivery_challans_id.package_id.order_id",
                    foreignField: "_id",
                    as: "delivery_challans_id.package_id.order_id"
                }
            },
            {
                $unwind: "$delivery_challans_id.package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "delivery_challans_id.package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "delivery_challans_id.package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$delivery_challans_id.package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "delivery_challans_id.package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "delivery_challans_id.package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$delivery_challans_id.package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "delivery_challans_id.package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "delivery_challans_id.package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$delivery_challans_id.package_id.order_id.item_id.item_group_id"
            },
            {
                $sort: {
                    shipment_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getShipmentsController;