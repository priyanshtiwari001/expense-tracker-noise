const express = require('express');

// const { InfoController } = require('../../controllers');

const router = express.Router();
const expanseRoutes = require('./expanse-routes');

// router.get('/info', InfoController.info);
router.use('/expanses', expanseRoutes);

module.exports = router;
