const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const packageModel = require("../../../models/Sales/packageModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getPackageController = async (req, res) => {
    try {
        // Populate method

        // const data = await packageModel.find({}).populate([
        //     {
        //         path: 'order_id',
        //         model: salesOrderModel,
        //         populate: [
        //             {
        //                 path: 'customer_id',
        //                 model: customerModel,
        //             },
        //             {
        //                 path: 'item_id',
        //                 model: itemsModel,
        //                 populate: [{
        //                     path: 'item_group_id',
        //                     model: itemsGroupModel
        //                 }]
        //             }
        //         ]
        //     }
        // ])

        // aggregate method

        const data = await packageModel.aggregate([
            {
                $lookup: {
                    from: "salesorders",
                    localField: "order_id",
                    foreignField: "_id",
                    as: "order_id"
                }
            },
            {
                $unwind: "$order_id"
            },
            {
                $lookup: {
                    from: "customers",
                    localField: "order_id.customer_id",
                    foreignField: "_id",
                    as: "order_id.customer_id"
                }
            },
            {
                $unwind: "$order_id.customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "order_id.item_id",
                    foreignField: "_id",
                    as: "order_id.item_id"
                }
            },
            {
                $unwind: "$order_id.item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "order_id.item_id.item_group_id",
                    foreignField: "_id",
                    as: "order_id.item_id.item_group_id"
                }
            },
            {
                $unwind: "$order_id.item_id.item_group_id"
            }
        ])
        
        res.send({ success: data })
    } catch (error) {
        res.send(error);
    }
}

module.exports = getPackageController