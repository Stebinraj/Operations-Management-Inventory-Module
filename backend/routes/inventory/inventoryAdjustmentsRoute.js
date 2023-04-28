const express = require('express');
const itemsModel = require('../../models/Inventory/itemsModel');
const inventoryAdjModel = require('../../models/Inventory/inventoryAdjustmentsModel');
const moment = require('moment');
const router = express.Router();

// update items
router.put('/adjust-items/:id', async (req, res) => {
    const adjustments = new inventoryAdjModel(req.body);
    const items = await itemsModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    const data = await adjustments.save();
    res.send({ success: data,items });
});

// get adjustment reports
router.get('/adjust-reports', async (req, res) => {
    const data = await inventoryAdjModel.find({});
    res.send({ success: data })
});

// read data by specific date
router.post('/date-range-reports', async (req, res) => {
    try {
        const startDate = moment(req.body.start).startOf('date');
        const endDate = moment(req.body.end).endOf('date');

        const data = await inventoryAdjModel.find({ date: { $gte: startDate, $lte: endDate } });
        res.send({ success: data });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;