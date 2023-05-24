const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getShippedItemsSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Shipped' }
            },
            {
                $group: {
                    _id: null,
                    shippedQuantity: { $sum: '$quantity' },
                    shippedTotalPrice: {
                        $sum: {
                            $multiply: ['$quantity', '$ordered_price_per_item']
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

module.exports = getShippedItemsSummaryController