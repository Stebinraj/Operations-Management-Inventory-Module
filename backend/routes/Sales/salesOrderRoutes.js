const express = require('express');
const placeOrderController = require('../../controller/Sales/POST/placeOrderController');
const getOrderController = require('../../controller/Sales/GET/getOrderController');
const getFilterSalesController = require('../../controller/Sales/GET/getFilterSalesController');
const router = express.Router();

router.post('/salesorders', placeOrderController);

router.get('/salesorders', getOrderController);

router.get('/filter/salesorders/:id',getFilterSalesController);

module.exports = router;