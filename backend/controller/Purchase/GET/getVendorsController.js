const vendorModel = require("../../../models/Purchase/vendorsModel");

const getVendorsController = async (req, res) => {
    try {
        const data = await vendorModel.find({});
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getVendorsController;