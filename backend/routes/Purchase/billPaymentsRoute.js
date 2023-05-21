const express = require('express');
const addBillPaymentsController = require('../../controller/Purchase/POST/addBillPaymentsController');
const router = express.Router();

router.post('/payments/bills', addBillPaymentsController);

module.exports = router;