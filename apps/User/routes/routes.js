const express = require('express');

// Bring in routes
const GraphQLQuery = require('./GraphQL-Query');
const UpdateUser = require('./Update-User');
const UserSignIn = require('./User-Sign-In');

const router = express.Router();

// Add routes to the router
router.use('/', GraphQLQuery.routes);
router.use('/', UpdateUser.routes);
router.use('/', UserSignIn.routes);

module.exports.routes = router;
