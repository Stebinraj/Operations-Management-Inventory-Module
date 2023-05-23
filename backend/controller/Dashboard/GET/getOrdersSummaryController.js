const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getOrdersSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Confirmed' }
            },
            {
                $group: {
                    _id: null,
                    orderQuantity: { $sum: '$quantity' },
                    orderTotalPrice: {
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

module.exports = getOrdersSummaryController