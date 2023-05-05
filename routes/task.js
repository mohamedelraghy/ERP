const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');
const auth = require('../middleware/is-Auth');

router.post('/create/:id', auth, taskController.create);

router.get('/tasks', auth, taskController.myTask);

router.put('/status/:id', auth, taskController.changeStatus);

module.exports = router;