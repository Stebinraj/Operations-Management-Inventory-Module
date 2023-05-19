const express = require('express');
const addCreditNotesController = require('../../controller/Sales/POST/addCreditNotesController');
const getCreditNotesController = require('../../controller/Sales/GET/getCreditNotesController');
const router = express.Router();

router.post('/credit-notes', addCreditNotesController);

router.get('/credit-notes', getCreditNotesController);

module.exports = router;