const express = require('express');
const router = express.Router();
const { addCompany } = require('../controllers/companyController');

router.post('/companies', addCompany);

module.exports = router;
