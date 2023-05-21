const moment = require("moment/moment");
const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");

const getAdjustmentDateRangeReportsController = async (req, res) => {
    try {
        const startDate = moment(req.body.start).startOf('date').toDate();
        const endDate = moment(req.body.end).endOf('date').toDate();

        const data = await inventoryAdjModel.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate }
                }
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
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getAdjustmentDateRangeReportsController;