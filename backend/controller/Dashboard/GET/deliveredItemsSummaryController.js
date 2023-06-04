const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const deliveredItemsSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Delivered' }
            },
            {
                $group: {
                    _id: null,
                    deliveredItems: { $sum: '$quantity' },
                    deliveredItemsPrice: {
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

module.exports = deliveredItemsSummaryController;