const express = require('express');
const placeOrderController = require('../../controller/Sales/POST/placeOrderController');
const getOrderController = require('../../controller/Sales/GET/getOrderController');
const router = express.Router();

router.post('/salesorders', placeOrderController);

// get sales order
router.get('/salesorders', getOrderController);

module.exports = router;