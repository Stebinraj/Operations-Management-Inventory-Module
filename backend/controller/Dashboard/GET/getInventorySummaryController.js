const itemsModel = require("../../../models/Inventory/itemsModel");

const getInventorySummaryController = async (req, res) => {
    try {
        const data = await itemsModel.aggregate([
            {
                $group: {
                    _id: null,
                    inventoryTotalStock: { $sum: '$opening_stock' },
                    inventoryTotalPrice: {
                        $sum: {
                            $multiply: ['$opening_stock', '$selling_price']
                        }
                    }
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getInventorySummaryController