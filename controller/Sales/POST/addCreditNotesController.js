const creditsNotesModel = require("../../../models/Sales/creditNotesModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addCreditNotesController = async (req, res) => {
    try {
        const data = await creditsNotesModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.credit_status } });
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = addCreditNotesController