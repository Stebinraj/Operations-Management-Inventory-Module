const vendorModel = require("../../../models/Purchase/vendorsModel");

const getVendorCountController = async (req, res) => {
    try {
        const data = await vendorModel.countDocuments();
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
}

module.exports = getVendorCountController;