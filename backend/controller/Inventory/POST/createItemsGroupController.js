const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const createItemsGroupController = async (req, res) => {
    try {
        const data = await itemsGroupModel.create(req.body);
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = createItemsGroupController;