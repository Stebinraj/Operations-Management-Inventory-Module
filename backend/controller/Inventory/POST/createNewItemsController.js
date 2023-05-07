const itemsModel = require("../../../models/Inventory/itemsModel");

const createNewItemsController = async (req, res) => {
    try {
        const items = new itemsModel(req.body);
        const data = await items.save();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = createNewItemsController