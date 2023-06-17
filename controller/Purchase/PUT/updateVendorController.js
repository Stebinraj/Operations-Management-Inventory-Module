const vendorModel = require("../../../models/Purchase/vendorsModel");

const updateVendorController = async (req, res) => {
    try {
        const data = await vendorModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = updateVendorController;