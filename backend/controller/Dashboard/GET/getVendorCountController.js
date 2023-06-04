const vendorModel = require("../../../models/Purchase/vendorsModel");

const getVendorCountController = async (req, res) => {
    try {
        const data = await vendorModel.countDocuments();
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = getVendorCountController;