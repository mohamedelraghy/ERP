const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');
const auth = require('../middleware/is-Auth');

router.post('/signup', auth, employeeController.signup);

router.post('/login', employeeController.login);

module.exports = router;