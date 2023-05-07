const express = require('express');
const createItemsGroupController = require('../../controller/Inventory/POST/createItemsGroupController');
const getItemsGroupsController = require('../../controller/Inventory/GET/getItemsGroupsController');
const router = express.Router();

// create items group
router.post('/items-group', createItemsGroupController);

// retrive items groups
router.get('/items-group', getItemsGroupsController);

module.exports = router;