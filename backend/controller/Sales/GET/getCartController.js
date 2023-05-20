const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const cartModel = require("../../../models/Sales/cartModel");
const customerModel = require("../../../models/Sales/customersModel");

const getCartController = async (req, res) => {
    try {
        // populate method
        
        // const data = await cartModel.find({}).populate([
        //     {
        //         path: 'item_id',
        //         model: itemsModel,
        //         populate: {
        //             path: 'item_group_id',
        //             model: itemsGroupModel
        //         }
        //     },
        //     {
        //         path: 'customer_id',
        //         model: customerModel
        //     }
        // ]);

        // aggregate method
        const data = await cartModel.aggregate([
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
                $lookup: {
                    from: "customers",
                    localField: "customer_id",
                    foreignField: "_id",
                    as: "customer_id"
                }
            },
            {
                $unwind: "$customer_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getCartController