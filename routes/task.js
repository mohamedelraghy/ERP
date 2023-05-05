const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');
const auth = require('../middleware/is-Auth');

router.post('/create/:id', auth, taskController.create);

// router.post('/login', employeeController.login);

module.exports = router;