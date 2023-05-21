const express = require('express');
const addReceivedPurchaseOrdersController = require('../../controller/Purchase/POST/addReceivedPurchaseOrdersController');
const getReceivedPurchaseOrdersController = require('../../controller/Purchase/GET/getReceivedPurchaseOrdersController');
const router = express.Router();

router.post('/purchase/received', addReceivedPurchaseOrdersController);

router.get('/purchase/received', getReceivedPurchaseOrdersController);

module.exports = router;