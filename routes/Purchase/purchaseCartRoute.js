const express = require('express');
const addPurchaseCartController = require('../../controller/Purchase/POST/addPurchaseCartController');
const getPurchaseCartController = require('../../controller/Purchase/GET/getPurchaseCartController');
const deletePurchaseCartController = require('../../controller/Purchase/DELETE/deletePurchaseCartController');
const router = express.Router();

router.post('/purchase/cart', addPurchaseCartController);

router.get('/purchase/cart', getPurchaseCartController);

router.delete('/purchase/cart', deletePurchaseCartController);

module.exports = router;