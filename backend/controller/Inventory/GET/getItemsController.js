const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");

const getItemsController = async (req, res) => {
    try {
        const data = await itemsModel.find({}).populate({
            path: 'item_group_id',
            model: itemsGroupModel
        });
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getItemsController;