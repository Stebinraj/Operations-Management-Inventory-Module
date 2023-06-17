const express = require('express');
const addShipmentsController = require('../../controller/Sales/POST/addShipmentsController');
const getShipmentsController = require('../../controller/Sales/GET/getShipmentsController');
const router = express.Router();

router.post('/shipments', addShipmentsController);

router.get('/shipments', getShipmentsController);

module.exports = router;