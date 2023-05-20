const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");

const getItemsController = async (req, res) => {
    try {
        // populate method

        // const data = await itemsModel.find({}).populate({
        //     path: 'item_group_id',
        //     model: itemsGroupModel
        // });

        // aggregate method

        const data = await itemsModel.aggregate([
            {
                $lookup: {
                    from: "item-groups",
                    localField: "item_group_id",
                    foreignField: "_id",
                    as: "item_group_id"
                }
            },
            {
                $unwind: "$item_group_id"
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getItemsController;