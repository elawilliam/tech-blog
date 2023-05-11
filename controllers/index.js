const router = require('express').Router();

// Imports routes for home page, dashboard & API //
const dashboardRoutes = require('./dashboardRoutes.js');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require("./api");

// Registers routes for home page, dashboard & API //
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;