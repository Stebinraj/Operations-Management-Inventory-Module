const express = require('express');
const itemsModel = require('../models/itemsModel');
const inventoryAdjModel = require('../models/inventoryAdjustmentsModel');
const router = express.Router();

// update items
router.put('/adjust-items/:id', async (req, res) => {
    const adjustments = new inventoryAdjModel(req.body);
    const items = await itemsModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    const data = await adjustments.save();
    res.send({ success: data, items });
});

module.exports = router;