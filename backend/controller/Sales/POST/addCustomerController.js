const customerModel = require("../../../models/Sales/customersModel");

const addCustomerController = async (req, res) => {
    try {
        const customers = new customerModel(req.body);
        const data = await customers.save();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = addCustomerController;