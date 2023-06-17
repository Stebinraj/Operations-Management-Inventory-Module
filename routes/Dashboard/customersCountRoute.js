const express = require('express');
const getCustomerCountController = require('../../controller/Dashboard/GET/getCustomerCountController');
const router = express.Router();

router.get('/customer/count', getCustomerCountController);

module.exports = router;