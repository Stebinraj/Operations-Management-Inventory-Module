const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getPackedItemsSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Packed' }
            },
            {
                $group: {
                    _id: null,
                    packedItemsQuantity: { $sum: '$quantity' },
                    packedItemsTotalPrice: {
                        $sum: {
                            $multiply: ['$quantity', '$ordered_price_per_item']
                        }
                    }
                }
            }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getPackedItemsSummaryController