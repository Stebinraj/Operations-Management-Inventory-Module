const packageModel = require("../../../models/Sales/packageModel");

const getPackageController = async (req, res) => {
    try {
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
            },
            {
                $sort: {
                    package_date: -1
                }
            }
        ])

        res.send({ success: data })
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getPackageController