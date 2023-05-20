const itemsModel = require("../../../models/Inventory/itemsModel");

const createNewItemsController = async (req, res) => {
    try {
        const data = await itemsModel.create(req.body);
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = createNewItemsController