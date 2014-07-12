'use strict';

/**
 * Logout action
 */
module.exports = function (req, res){
  waterlock.cycle.logout(req, res);
};