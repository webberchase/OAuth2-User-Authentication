/**
 * Author
 * Joseph Hentges
 * September 2019
 * https://joeyhentges.com
 *
 * This is the model of the mongoose database entry.
 */

// libraries, and getting the database connections
const { Schema } = require('mongoose');
const { dbs } = require('../../configs');

const schema = new Schema({
  accessToken: String,
  // my variables they set on first sign in
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  // some account checking variables
  locked: Boolean,
  disabled: Boolean,
  accountVerified: Boolean,
  // dates
  dateCreated: Date,
  dateModified: Date,
  dateLastLoggedIn: Date,
  // objects
  logs: [{
    time: String,
    message: String,
  }],
});

module.exports.User = dbs.db1().model('User', schema);
