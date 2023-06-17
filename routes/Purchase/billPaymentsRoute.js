const express = require('express');
const addBillPaymentsController = require('../../controller/Purchase/POST/addBillPaymentsController');
const getBillPaymentsController = require('../../controller/Purchase/GET/getBillPaymentsController');
const router = express.Router();

router.post('/payments/bills', addBillPaymentsController);

router.get('/payments/bills', getBillPaymentsController);

module.exports = router;