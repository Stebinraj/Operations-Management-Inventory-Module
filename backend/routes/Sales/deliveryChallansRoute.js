const express = require('express');
const addDeliveryChallansController = require('../../controller/Sales/POST/addDeliveryChallansController');
const router = express.Router();

router.post('/delivery-challans', addDeliveryChallansController);

module.exports = router;