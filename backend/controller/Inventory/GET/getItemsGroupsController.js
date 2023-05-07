const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const getItemsGroupsController = async (req, res) => {
    try {
        const data = await itemsGroupModel.find({});
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getItemsGroupsController;