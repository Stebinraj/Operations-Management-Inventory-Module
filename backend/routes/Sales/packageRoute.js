const express = require('express');
const addPackageController = require('../../controller/Sales/POST/addPackageController');
const getPackageController = require('../../controller/Sales/GET/getPackageController');
const router = express.Router();

router.post('/packages', addPackageController);

router.get('/packages', getPackageController);

module.exports = router;