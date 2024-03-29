const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getProductSalesSummaryController = async (req, res) => {
    try {
        const data = await salesOrderModel.aggregate([
            {
                $match: { order_status: 'Paid' }
            },
            {
                $group: {
                    _id: null,
                    salesQuantity: { $sum: '$quantity' },
                    salesTotalPrice: {
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

module.exports = getProductSalesSummaryController