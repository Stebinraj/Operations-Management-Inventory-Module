const express = require('express');
const getShippedItemsSummaryController = require('../../controller/Dashboard/GET/getShippedItemsSummaryController');
const router = express.Router();

router.get('/shipped-items/summary', getShippedItemsSummaryController);

module.exports = router;