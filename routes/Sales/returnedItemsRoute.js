const express = require('express');
const addReturnedItemsController = require('../../controller/Sales/POST/addReturnedItemsController');
const getReturnedItemsController = require('../../controller/Sales/GET/getReturnedItemsController');
const router = express.Router();

router.post('/returns/items', addReturnedItemsController);

router.get('/returns/items', getReturnedItemsController);

module.exports = router;