const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');
const auth = require('../middleware/is-Auth');

router.post('/signup', auth, employeeController.signup);

router.post('/login', employeeController.login);

router.put('/addSalary/:id', auth, employeeController.addSalary);

module.exports = router;