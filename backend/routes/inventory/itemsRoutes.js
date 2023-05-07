const express = require('express');
const createNewItemsController = require('../../controller/Inventory/POST/createNewItemsController');
const getItemsController = require('../../controller/Inventory/GET/getItemsController');
const getItemsBySpecificIdController = require('../../controller/Inventory/GET/getItemsBySpecificIdController');
const router = express.Router();

// create items
router.post('/items', createNewItemsController);

// retrieve items
router.get('/items', getItemsController);

// get items by id
router.get('/items/:id', getItemsBySpecificIdController);

// aggregate

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

// aggregate


module.exports = router;