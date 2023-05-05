const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');

router.post('/signup', employeeController.signup);

router.post('/login', employeeController.login);

module.exports = router;