const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");

const getItemsGroupsController = async (req, res) => {
    try {
        // mongoose library usage

        // const data = await itemsGroupModel.find({});

        // aggregate method

        const data = await itemsGroupModel.aggregate([
            { $match: {} }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getItemsGroupsController;