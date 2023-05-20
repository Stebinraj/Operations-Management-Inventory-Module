const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getOrderController = async (req, res) => {
    try {
        // populate method

        // const data = await salesOrderModel.find({}).populate([
        //     {
        //         path: 'customer_id',
        //         model: customerModel
        //     },
        //     {
        //         path: 'item_id',
        //         model: itemsModel,
        //         populate: {
        //             path: 'item_group_id',
        //             model: itemsGroupModel
        //         }
        //     }
        // ])

        // aggregate method

        const data = await salesOrderModel.aggregate([
            {
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer_id"
                }
            },
            {
                $unwind: "$customer_id"
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "item_id"
                }
            },
            {
                $unwind: "$item_id"
            },
            {
                $lookup: {
                    from: "item-groups",
                    localField: "item_id.item_group_id",
                    foreignField: "_id",
                    as: "item_id.item_group_id"
                }
            },
            {
                $unwind: "$item_id.item_group_id"
            },
            {
                $sort: {
                    order_date: -1
                }
            }
        ])

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getOrderController;