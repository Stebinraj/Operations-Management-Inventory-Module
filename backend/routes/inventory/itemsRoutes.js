const express = require('express');
const itemsModel = require('../../models/Inventory/itemsModel');
const itemsGroupModel = require('../../models/Inventory/itemsGroupModel');
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

// aggregate and populate

router.get('/view/items', async (req, res) => {
    const data = await itemsModel.find({}).populate({
        path: 'item_group_id',
        model: itemsGroupModel,
        lean: true
    });
    res.send({ success: data });
});


// router.get('/view/items', async (req, res) => {
//     const data = await itemsModel.aggregate([
//         {
//             $lookup: {
//                 from: 'item-groups',
//                 localField: 'item_group_id',
//                 foreignField: '_id',
//                 as: 'item_group'
//             }
//         }
//     ]);
//     res.send({ success: data });
// });

// aggregate and populate


module.exports = router;