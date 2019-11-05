const express = require('express');

// Bring in routes
const UpdateLastLoggedIn = require('./Update-Last-Logged-In');
const UpdateLogs = require('./Update-Logs');

const router = express.Router();

// Add routes to the router
router.use('/', UpdateLastLoggedIn.routes);
router.use('/', UpdateLogs.routes);

module.exports.routes = router;
