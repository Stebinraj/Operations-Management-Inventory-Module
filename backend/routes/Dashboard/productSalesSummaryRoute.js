const express = require('express');
const getProductSalesSummaryController = require('../../controller/Dashboard/GET/getProductSalesSummaryController');
const router = express.Router();

router.get('/product-sales/summary', getProductSalesSummaryController);

module.exports = router;