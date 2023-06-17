const customerModel = require("../../../models/Sales/customersModel");

const addCustomerController = async (req, res) => {
    try {
        const data = await customerModel.create(req.body);
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addCustomerController;