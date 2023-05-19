const express = require('express');
const addVendorsController = require('../../controller/Purchase/POST/addVendorsController');
const getVendorsController = require('../../controller/Purchase/GET/getVendorsController');
const updateVendorController = require('../../controller/Purchase/PUT/updateVendorController');
const router = express.Router();

router.post('/vendors', addVendorsController);

router.get('/vendors', getVendorsController);

router.put('/vendors/:id', updateVendorController);

module.exports = router;