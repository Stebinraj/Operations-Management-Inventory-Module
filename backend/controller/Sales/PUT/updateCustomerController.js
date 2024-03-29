const customerModel = require("../../../models/Sales/customersModel");

const updateCustomerController = async (req, res) => {
    try {
        const data = await customerModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = updateCustomerController;