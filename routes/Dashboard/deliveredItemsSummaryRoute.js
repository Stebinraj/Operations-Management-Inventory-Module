const express = require('express');
const deliveredItemsSummaryController = require('../../controller/Dashboard/GET/deliveredItemsSummaryController');
const router = express.Router();

router.get('/delivered-items/summary',deliveredItemsSummaryController);

module.exports = router;