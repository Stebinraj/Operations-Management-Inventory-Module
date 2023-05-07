const moment = require("moment/moment");
const inventoryAdjModel = require("../../../models/Inventory/inventoryAdjustmentsModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const getAdjustmentDateRangeReportsController = async (req, res) => {
    try {
        const startDate = moment(req.body.start).startOf('date');
        const endDate = moment(req.body.end).endOf('date');

        const data = await inventoryAdjModel.find({ date: { $gte: startDate, $lte: endDate } }).populate({
            path: 'item_id',
            model: itemsModel,
            populate: {
                path: 'item_group_id',
                model: itemsGroupModel
            }
        });
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getAdjustmentDateRangeReportsController;