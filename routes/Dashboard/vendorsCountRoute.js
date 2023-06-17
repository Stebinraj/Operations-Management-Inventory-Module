const express = require('express');
const getVendorCountController = require('../../controller/Dashboard/GET/getVendorCountController');
const router = express.Router();

router.get('/vendor/count', getVendorCountController);

module.exports = router;