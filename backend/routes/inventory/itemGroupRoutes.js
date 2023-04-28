const express = require('express');
const itemsGroupModel = require('../../models/Inventory/itemsGroupModel');
const router = express.Router();

// create items group
router.post('/items-group', async (req, res) => {
    const itemGroup = new itemsGroupModel(req.body);
    const data = await itemGroup.save();
    res.send({ success: data });
});

// retrive items groups
router.get('/items-group', async (req, res) => {
    const data = await itemsGroupModel.find({});
    res.send({ success: data });
});

module.exports = router;