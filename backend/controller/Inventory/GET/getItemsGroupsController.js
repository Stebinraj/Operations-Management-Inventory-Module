const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const getItemsGroupsController = async (req, res) => {
    try {
        const data = await itemsGroupModel.aggregate([
            { $match: {} }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getItemsGroupsController;