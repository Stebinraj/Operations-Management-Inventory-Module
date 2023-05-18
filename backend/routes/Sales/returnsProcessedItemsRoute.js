const express = require('express');
const addReturnsProcessedItemsController = require('../../controller/Sales/POST/addReturnsProcessedItemsController');
const getReturnsProcessedItemsController = require('../../controller/Sales/GET/getReturnsProcessedItemsController');
const router = express.Router();

router.post('/process/returns', addReturnsProcessedItemsController);

router.get('/process/returns', getReturnsProcessedItemsController);

module.exports = router