const express = require('express');
const addPurchaseOrdersController = require('../../controller/Purchase/POST/addPurchaseOrdersController');
const getPurchaseOrdersController = require('../../controller/Purchase/GET/getPurchaseOrdersController');
const router = express.Router();

router.post('/purchase/orders', addPurchaseOrdersController);

router.get('/purchase/orders', getPurchaseOrdersController);

module.exports = router;