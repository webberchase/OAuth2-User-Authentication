const { graphql } = require('graphql');
const express = require('express');
const { checkKey, checkQuery } = require('../../tools');
const { userResolvers } = require('../controllers/resolvers/user.resolvers');
const { userTypedefs } = require('../controllers/typeDefs/user.typedefs');

const router = express.Router();

let graphQL;

router.post('/', checkKey, async (req, res) => graphQL(req.body, res));

// Get the User by its ID
graphQL = async (body, res) => {
  let resolversType = 'Query';
  if (body.graphql.includes('mutation')) {
    resolversType = 'Mutation';
  }
  const result = await graphql(userTypedefs,
    body.graphql,
    userResolvers[resolversType]).then(response => response.data);

  if (checkQuery(result, res)) {
    return;
  }
  res.send(result);
};

module.exports.routes = router;
