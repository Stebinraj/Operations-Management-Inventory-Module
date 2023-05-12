const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const customerModel = require("../../../models/Sales/customersModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getOrderController = async (req, res) => {
    try {
        const data = await salesOrderModel.find({}).populate([
            {
                path: 'customer_id',
                model: customerModel
            },
            {
                path: 'item_id',
                model: itemsModel,
                populate: {
                    path: 'item_group_id',
                    model: itemsGroupModel
                }
            }
        ])
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getOrderController;