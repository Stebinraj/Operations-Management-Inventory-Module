const packageModel = require("../../../models/Sales/packageModel");
const salesOrderModel = require("../../../models/Sales/salesOrderModel");

const addPackageController = async (req, res) => {
    try {
        const data = await packageModel.create(req.body);
        const updateOrderStatus = await salesOrderModel.findByIdAndUpdate({ _id: req.body.order_id }, { $set: { order_status: req.body.package_status } })
        res.send({ success: data, updateOrderStatus });
    } catch (error) {
        res.send(error)
    }
}

module.exports = addPackageController