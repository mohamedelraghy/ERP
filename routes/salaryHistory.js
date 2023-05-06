const express = require('express');
const router = express.Router();

const salaryHistoryController = require('../controllers/salaryHistory');
const auth = require('../middleware/is-Auth');

router.post('/', auth, salaryHistoryController.create);

module.exports = router;