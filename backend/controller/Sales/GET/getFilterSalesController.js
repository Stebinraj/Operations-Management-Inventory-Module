const salesOrderModel = require("../../../models/Sales/salesOrderModel");
const mongoose = require('mongoose');

const getFilterSalesController = async (req, res) => {
    try {
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
                $match: {
                    $or: [
                        { "item_id.item_name": req.params.id },
                        { "customer_id.name": req.params.id }
                    ]
                }
            },
            {
                $sort: {
                    order_date: -1
                }
            }
        ])

        res.send({ success: data });
        console.log(data);
        console.log(req.params.id);
    } catch (error) {
        res.send(error)
    }
}

module.exports = getFilterSalesController