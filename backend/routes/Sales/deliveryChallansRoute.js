const express = require('express');
const addDeliveryChallansController = require('../../controller/Sales/POST/addDeliveryChallansController');
const getDeliveryChallansController = require('../../controller/Sales/GET/getDeliveryChallansController');
const router = express.Router();

router.post('/delivery-challans', addDeliveryChallansController);

router.get('/delivery-challans', getDeliveryChallansController);

module.exports = router;