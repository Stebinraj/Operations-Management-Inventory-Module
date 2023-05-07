const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const getOrderController = async (req, res) => {
    try {
        const data = await salesOrderModel.find({});
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getOrderController;