const express = require('express');
const itemsModel = require('../../models/Inventory/itemsModel');
const router = express.Router();

// create items
router.post('/items', async (req, res) => {
    const items = new itemsModel(req.body);
    const data = await items.save();
    res.send({ success: data });
});

// retrieve items
router.get('/items', async (req, res) => {
    const data = await itemsModel.find({});
    res.send({ success: data });
});

// get items by id
router.get('/items/:id', async (req, res) => {
    const data = await itemsModel.find({ item_group_id: req.params.id });
    res.send({ success: data });
});

module.exports = router;