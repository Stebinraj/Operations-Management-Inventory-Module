const purchaseCartModel = require("../../../models/Purchase/purchaseCartModel")

const deletePurchaseCartController = async (req, res) => {
    try {
        const data = await purchaseCartModel.findByIdAndDelete({ _id: req.body.id });
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = deletePurchaseCartController