const { graphql } = require('graphql');
const express = require('express');
const { checkKey } = require('../../tools');
const { userResolvers } = require('../controllers/resolvers/user.resolvers');
const { userTypedefs } = require('../controllers/typeDefs/user.typedefs');
const {
  updateLogs, updateLastLogged
} = require('../../Account-Helpers/Account-Helpers-exports');

const router = express.Router();

let userSignIn;

router.post('/sign-in', checkKey, async (req, res) => userSignIn(req.body, res));

let getUser;
let createUser;
let checkAccount;
let updateDatabase;
userSignIn = async (body, res) => {
  // get some values
  let userVals = await getUser(body.accessToken, body.values);

  if (userVals == null) {
    userVals = await createUser(body.accessToken);
  }

  // destructure the values
  const {
    id, disabled
  } = userVals;

  const check = await checkAccount(id, disabled);

  // other account checks
  if (check === 'disabled') {
    res.send({
      status: 'failure',
      reason: 'account disabled'
    });
    return;
  }

  // successfully logged in - update some values in the user doc
  const lastLogged = await updateDatabase(id);

  userVals.logs = undefined;
  userVals.lastLogged = lastLogged;
  res.send({
    status: 'success',
    values: userVals
  });
};

module.exports.routes = router;

// get the user
getUser = async (accessToken, values) => {
  const result = await graphql(userTypedefs,
    `{ getUserByAccessToken(accessToken: "${accessToken}") { ${values} logs disabled id username } }`,
    userResolvers.Query).then(response => response.data.getUserByAccessToken);

  return result;
};

// if the user doesn't exist already - create them
createUser = async (accessToken) => {
  const result = await graphql(userTypedefs,
    `mutation{ createUser(accessToken: "${accessToken}") { logs disabled id } }`,
    userResolvers.Mutation).then(response => response.data.createUser);

  await updateLogs(result.id, 'authentication', 9, accessToken);

  return result;
};

// check the account is allowed to login
checkAccount = async (id, disabled) => {
  if (disabled) {
    // Update the user's logs
    await updateLogs(id, 'authentication', 4);

    return 'disabled';
  }

  if (disabled) {
    return 'disabled';
  }

  return 'login successful';
};

// update the database, and get he users last logged in date
updateDatabase = async (id) => {
  // update the users logs
  await updateLogs(id, 'authentication', 1);

  // Update the user's last logged in
  return updateLastLogged(id);
};
