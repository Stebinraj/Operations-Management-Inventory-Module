const express = require('express');
const itemsModel = require('../../models/Inventory/itemsModel');
const inventoryAdjModel = require('../../models/Inventory/inventoryAdjustmentsModel');
const moment = require('moment');
const itemsGroupModel = require('../../models/Inventory/itemsGroupModel');
const router = express.Router();

// update items
router.put('/adjust-items/:id', async (req, res) => {
    try {
        const adjustments = new inventoryAdjModel(req.body);
        const items = await itemsModel.findById(req.params.id);
        if (req.body.quantity) {
            await itemsModel.findByIdAndUpdate(items._id, { $inc: { opening_stock: req.body.quantity } });
            await adjustments.save();
            res.send({ success: adjustments, items });
        }
        else if (req.body.value) {
            await itemsModel.findByIdAndUpdate(items._id, { $inc: { selling_price: req.body.value } });
            await adjustments.save();
            res.send({ success: adjustments, items });
        }
    } catch (error) {
        res.send(error);
    }
});

// get adjustment reports
router.get('/adjust-reports', async (req, res) => {
    try {
        const data = await inventoryAdjModel.find({}).populate({
            path: 'item_id',
            model: itemsModel,
            populate: {
                path: 'item_group_id',
                model: itemsGroupModel
            }
        });
        res.send({ success: data })
    } catch (error) {
        res.send(error);
    }
});

// read data by specific date
router.post('/date-range-reports', async (req, res) => {
    try {
        const startDate = moment(req.body.start).startOf('date');
        const endDate = moment(req.body.end).endOf('date');

        const data = await inventoryAdjModel.find({ date: { $gte: startDate, $lte: endDate } }).populate({
            path: 'item_id',
            model: itemsModel,
            populate: {
                path: 'item_group_id',
                model: itemsGroupModel
            }
        });
        res.send({ success: data });
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;