const express = require('express');
const router =  express.Router();
const controller = require('../controllers/test.controller');

//Post /api/test
router.post('/',controller.testEndpoint);

module.exports = router;