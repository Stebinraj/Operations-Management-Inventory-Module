const express = require('express');
const getPackedItemsSummaryController = require('../../controller/Dashboard/GET/getPackedItemsSummaryController');
const router = express.Router();

router.get('/packed-items/summary', getPackedItemsSummaryController);

module.exports = router;