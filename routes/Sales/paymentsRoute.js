const express = require('express');
const addPaymentsController = require('../../controller/Sales/POST/addPaymentsController');
const getPaymentsController = require('../../controller/Sales/GET/getPaymentsController');
const router = express.Router();

router.post('/payments', addPaymentsController);

router.get('/payments', getPaymentsController);

module.exports = router;