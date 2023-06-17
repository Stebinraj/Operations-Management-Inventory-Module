const express = require('express');
const returnedItemsSummaryController = require('../../controller/Dashboard/GET/returnedItemsSummaryController');
const router = express.Router();

router.get('/returned-items/summary',returnedItemsSummaryController);

module.exports = router;