const express = require('express');
const getOrdersSummaryController = require('../../controller/Dashboard/GET/getOrdersSummaryController');
const router = express.Router();

router.get('/order/summary', getOrdersSummaryController);

module.exports = router;