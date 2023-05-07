const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const createItemsGroupController = async (req, res) => {
    try {
        const itemGroup = new itemsGroupModel(req.body);
        const data = await itemGroup.save();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = createItemsGroupController;