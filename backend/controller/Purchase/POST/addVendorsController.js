const vendorModel = require("../../../models/Purchase/vendorsModel");

const addVendorsController = async (req, res) => {
    try {
        const data = await vendorModel.create(req.body);
        res.send({ success: data });
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = addVendorsController;