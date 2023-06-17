const express = require('express');
const addDeliveredItemsController = require('../../controller/Sales/POST/addDeliveredItemsController');
const getDeliveredItemsController = require('../../controller/Sales/GET/getDeliveredItemsController');
const router = express.Router();

router.post('/delivered/items', addDeliveredItemsController);

router.get('/delivered/items', getDeliveredItemsController);

module.exports = router;