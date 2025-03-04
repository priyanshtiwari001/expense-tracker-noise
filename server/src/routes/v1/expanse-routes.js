const express = require('express');

const { ExpanseController } = require('../../controllers');
const { ExpanseMiddleware } = require('../../middlewares');

const router = express.Router();

router.post('/', ExpanseMiddleware.validateExpanse, ExpanseController.createExpanses);

router.get('/', ExpanseController.getExpanses);

router.get('/filter', ExpanseController.filterExpanses);

router.get('/total', ExpanseController.getTotalExpenses);

module.exports = router;