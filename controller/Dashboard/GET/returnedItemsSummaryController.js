const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const returnedItemsSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Returned' }
            },
            {
                $group: {
                    _id: null,
                    returnedItems: { $sum: '$quantity' },
                    returnedItemsPrice: {
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

module.exports = returnedItemsSummaryController