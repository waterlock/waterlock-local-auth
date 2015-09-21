'use strict';
var bcrypt = require('bcrypt');

/**
 * Login action
 */
module.exports = function(req, res){

  var scope = require('../../scope')(waterlock.Auth, waterlock.engine);
  var params = req.params.all();
  
  if(typeof params[scope.type] === 'undefined' || typeof params.password !== 'string'){
    waterlock.cycle.loginFailure(req, res, null, {error: 'Invalid '+scope.type+' or password'});
  }else{
    var pass = params.password;
    scope.getUserAuthObject(params, req, function(err, user){
      if (err) {
        if (err.code === 'E_VALIDATION') {
          return res.status(400).json(err);
        } else {
          return res.serverError(err);
        }
      }
      if (user) {
        if(bcrypt.compareSync(pass, user.auth.password)){
          waterlock.cycle.loginSuccess(req, res, user);
        }else{
          waterlock.cycle.loginFailure(req, res, user, {error: 'Invalid '+scope.type+' or password'});
        }
      } else {
        //TODO redirect to register
        waterlock.cycle.loginFailure(req, res, null, {error: 'user not found'});
      }
    });
  }
};
