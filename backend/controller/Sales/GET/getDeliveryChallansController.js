const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");
const packageModel = require("../../../models/Sales/packageModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getDeliveryChallansController = async (req, res) => {
    try {
        // populate method

        // const data = await deliveryChallansModel.find({}).populate([
        //     {
        //         path: 'package_id',
        //         model: packageModel,
        //         populate: {
        //             path: 'order_id',
        //             model: salesOrderModel,
        //             populate: [
        //                 {
        //                     path: 'customer_id',
        //                     model: customerModel
        //                 },
        //                 {
        //                     path: 'item_id',
        //                     model: itemsModel,
        //                     populate: {
        //                         path: 'item_group_id',
        //                         model: itemsGroupModel
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        // ]);

        // aggregate method

        const data = await deliveryChallansModel.aggregate([
            {
                $lookup: {
                    from: "packages",
                    localField: "package_id",
                    foreignField: "_id",
                    as: "package_id"
                }
            },
            {
                $unwind: "$package_id"
            },
            {
                $lookup: {
                    from: "salesorders",
                    localField: "package_id.order_id",
                    foreignField: "_id",
                    as: "package_id.order_id"
                }
            },
            {
                $unwind: "$package_id.order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "package_id.order_id.customer_id",
                    foreignField: "_id",
                    as: "package_id.order_id.customer_id"
                }
            },
            {
                $unwind: "$package_id.order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "package_id.order_id.item_id",
                    foreignField: "_id",
                    as: "package_id.order_id.item_id"
                }
            },
            {
                $unwind: "$package_id.order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "package_id.order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "package_id.order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$package_id.order_id.item_id.item_group_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getDeliveryChallansController