const express = require('express');
const customerModel = require('../../models/Sales/customersModel');
const router = express.Router();

// create customer
router.post('/customer', async (req, res) => {
    const customers = new customerModel(req.body);
    const data = await customers.save();
    res.send({ success: data });
})

// retrieve customers
router.get('/customer', async (req, res) => {
    const data = await customerModel.find({});
    res.send({ success: data });
});

// update customers
router.put('/customer/:id', async (req, res) => {
    const data = await customerModel.findByIdAndUpdate({ _id: req.params.id },req.body);
    res.send({ success: data });
})

module.exports = router;