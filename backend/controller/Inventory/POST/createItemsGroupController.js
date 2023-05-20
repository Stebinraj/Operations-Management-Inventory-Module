const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const createItemsGroupController = async (req, res) => {
    try {
        const data = await itemsGroupModel.create(req.body);
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = createItemsGroupController;