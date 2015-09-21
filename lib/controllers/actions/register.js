'use strict';
var bcrypt = require('bcrypt');

/**
 * Login action
 */
module.exports = function(req, res) {

  var scope = require('../../scope')(waterlock.Auth, waterlock.engine);
  var params = req.params.all();

  if (typeof params[scope.type] === 'undefined' || typeof params.password === 'undefined') {
    waterlock.cycle.registerFailure(req, res, null, {
      error: 'Invalid ' + scope.type + ' or password'
    });
  } else {
    var pass = params.password;

    scope.registerUserAuthObject(params, req, function(err, user) {
      if (err) {
        res.serverError(err);
      }
      if (user) {
        //NOTE: not sure we need to bother with bcrypt here?
        if (bcrypt.compareSync(pass, user.auth.password)) {
          waterlock.cycle.registerSuccess(req, res, user);
        } else {
          waterlock.cycle.registerFailure(req, res, user, {
            error: 'Invalid ' + scope.type + ' or password'
          });
        }
      } else {
        waterlock.cycle.registerFailure(req, res, null, {
          error: scope.type + ' is already in use'
        });
      }
    });

  }
};
