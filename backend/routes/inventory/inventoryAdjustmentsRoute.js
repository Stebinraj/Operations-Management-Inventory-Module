const express = require('express');
const getAdjustmentReportsController = require('../../controller/Inventory/GET/getAdjustmentReportsController');
const adjustInventoryItemsController = require('../../controller/Inventory/PUT/adjustInventoryItemsController');
const getAdjustmentDateRangeReportsController = require('../../controller/Inventory/GET/getAdjustmentDateRangeReportsController');
const router = express.Router();

// update items
router.put('/adjust-items/:id', adjustInventoryItemsController);

// get adjustment reports
router.get('/adjust-reports', getAdjustmentReportsController);

// read data by specific date
router.post('/date-range-reports', getAdjustmentDateRangeReportsController);

module.exports = router;