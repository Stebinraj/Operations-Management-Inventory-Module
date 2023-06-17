const express = require('express');
const addInvoicesController = require('../../controller/Sales/POST/addInvoicesController');
const getInvoicedItemsController = require('../../controller/Sales/GET/getInvoicedItemsController');
const router = express.Router();

router.post('/invoices', addInvoicesController);

router.get('/invoices', getInvoicedItemsController);

module.exports = router