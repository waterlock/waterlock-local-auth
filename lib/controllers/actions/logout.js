'use strict';

/**
 * Logout action
 */
module.exports = function (req, res, waterlock){
  waterlock.authEvent.logout(req, res);
};