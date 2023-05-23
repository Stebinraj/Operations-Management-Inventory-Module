const express = require('express');
const getInventorySummaryController = require('../../controller/Dashboard/GET/getInventorySummaryController');
const router = express.Router();

router.get('/inventory/summary', getInventorySummaryController);

module.exports = router;