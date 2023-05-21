const express = require('express');
const addBillsController = require('../../controller/Purchase/POST/addBillsController');
const getBillsController = require('../../controller/Purchase/GET/getBillsController');
const router = express.Router();

router.post('/purchase/bills', addBillsController);

router.get('/purchase/bills', getBillsController);

module.exports = router;