const itemsModel = require("../../../models/Inventory/itemsModel");

const getItemsBySpecificIdController = async (req, res) => {
    try {
        const data = await itemsModel.aggregate([
            { $match: { item_group_id: req.params.id } }
        ]);


        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getItemsBySpecificIdController