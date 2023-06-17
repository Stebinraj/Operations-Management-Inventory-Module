const express = require('express');
const getCartController = require('../../controller/Sales/GET/getCartController');
const addToCartController = require('../../controller/Sales/POST/addToCartController');
const deleteCartController = require('../../controller/Sales/DELETE/deleteCartController');
const router = express.Router();

router.post('/cart', addToCartController);

router.get('/cart', getCartController);

router.delete('/cart', deleteCartController);

module.exports = router;