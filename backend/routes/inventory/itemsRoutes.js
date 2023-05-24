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


module.exports = router;