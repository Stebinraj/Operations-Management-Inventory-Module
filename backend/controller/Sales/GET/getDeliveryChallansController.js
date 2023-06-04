const deliveryChallansModel = require("../../../models/Sales/deliveryChallansModel");

const getDeliveryChallansController = async (req, res) => {
    try {
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
            },
            {
                $sort: {
                    challan_date: -1
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getDeliveryChallansController