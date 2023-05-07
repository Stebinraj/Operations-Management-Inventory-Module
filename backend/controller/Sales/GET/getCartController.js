const itemsGroupModel = require("../../../models/Inventory/itemsGroupModel");
const itemsModel = require("../../../models/Inventory/itemsModel");
const cartModel = require("../../../models/Sales/cartModel");
const customerModel = require("../../../models/Sales/customersModel");

const getCartController = async (req, res) => {
    try {
        const data = await cartModel.find({}).populate([
            {
                path: 'item_id',
                model: itemsModel,
                populate: {
                    path: 'item_group_id',
                    model: itemsGroupModel
                }
            },
            {
                path: 'customer_id',
                model: customerModel
            }
        ]);
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getCartController