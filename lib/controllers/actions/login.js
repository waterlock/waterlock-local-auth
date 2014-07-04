'use strict';
var bcrypt = require('bcrypt-nodejs');
var scope;

/**
 * Login action
 */
module.exports = function(req, res, waterlock){
  
  scope = require('../../scope')(waterlock.authEvent);
  
  if(typeof req.body[scope.type] === 'undefined' || typeof req.body.password === 'undefined'){
    waterlock.authEvent.loginFailure(req, res, null, {error: 'Invalid '+scope.type+' or password'});
  }else{
    var pass = req.body.password;
    scope.findOrCreate(req.body, req, function(err, user){
      if (err) {
        res.serverError(err);
      }
      if (user) {
        if(bcrypt.compareSync(pass, user.auth.password)){
          waterlock.authEvent.loginSuccess(req, res, user);
        }else{
          waterlock.authEvent.loginFailure(req, res, user, {error: 'Invalid '+scope.type+' or password'});
        }
      } else {
        //TODO redirect to register
        waterlock.authEvent.loginFailure(req, res, null, {error: 'user not found'});
      }
    });
  }
};