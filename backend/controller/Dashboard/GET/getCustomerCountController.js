const customerModel = require("../../../models/Sales/customersModel");

const getCustomerCountController = async (req, res) => {
    try {
        const data = await customerModel.countDocuments();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getCustomerCountController