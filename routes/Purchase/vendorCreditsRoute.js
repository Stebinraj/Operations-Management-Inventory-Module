const express = require('express');
const addVendorCreditsController = require('../../controller/Purchase/POST/addVendorCreditsController');
const getVendorCreditsController = require('../../controller/Purchase/GET/getVendorCreditsController');
const router = express.Router();

router.post('/purchase/vendor/credits', addVendorCreditsController);

router.get('/purchase/vendor/credits', getVendorCreditsController);

module.exports = router;