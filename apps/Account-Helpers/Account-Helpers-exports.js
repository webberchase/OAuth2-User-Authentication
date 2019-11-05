/**
 * Author
 * Joseph Hentges
 * September 2019
 * https://joeyhentges.com
 *
 * Exporting the Account Helper models, resolvers and typedefs.
 * This is for use outside this app. Makes it eaiser to grab the needed items
 */

// Other Helper Fuctions
const { updateLogs } = require('./routes/Update-Logs');

// the helper functions / items to be exported
const contents = {
  updateLogs
};

// export the contents
module.exports = contents;
