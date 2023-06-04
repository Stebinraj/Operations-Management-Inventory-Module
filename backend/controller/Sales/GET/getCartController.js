const cartModel = require("../../../models/Sales/cartModel");

const getCartController = async (req, res) => {
    try {
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
        res.status(500).send(error);
    }
}

module.exports = getCartController