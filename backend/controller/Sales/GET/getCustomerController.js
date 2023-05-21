const customerModel = require("../../../models/Sales/customersModel");

const getCustomerController = async (req, res) => {
    try {
        const data = await customerModel.aggregate([
            { $match: {} }
        ]);

        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getCustomerController