const express = require('express');
const addCustomerController = require('../../controller/Sales/POST/addCustomerController');
const getCustomerController = require('../../controller/Sales/GET/getCustomerController');
const updateCustomerController = require('../../controller/Sales/PUT/updateCustomerController');
const router = express.Router();

// create customer
router.post('/customer', addCustomerController);

// retrieve customers
router.get('/customer', getCustomerController);

// update customers
router.put('/customer/:id', updateCustomerController)

module.exports = router;