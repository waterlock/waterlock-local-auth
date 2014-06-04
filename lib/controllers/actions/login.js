'use strict';

var user;
var type;
var scope;

/**
 * run once to determin the scope 
 * @return {[type]} [description]
 */
function checkScope(){
  if(typeof user.email !== 'undefined'){
    type = 'email';
    scope = emailFuncs;
  }else if(typeof user.username !== 'undefined'){
    type = 'username';
    scope = usernameFuncs;
  }else{
    throw 'User model must have either an email or username attribute';
  }  
}

/**
 * Wrapper for model methods username scope
 * @type {Object}
 */
var usernameFuncs = {
  findOrCreate: function(User, attributes, cb){
    User.findOrCreate({username: attributes.username}, attributes).done(cb);
  }
};

/**
 * Wrapper for model methods email scope
 * @type {Object}
 */
var emailFuncs = {
  findOrCreate: function(User, attributes, cb){
    User.findOrCreate({email: attributes.email}, attributes).done(cb);
  }
};

/**
 * Login action
 */
module.exports = function(req, res){
  var bcrypt = require('bcrypt');
  if(typeof user === 'undefined'){
    user = User.definition;
    checkScope();
  }
  
  if(typeof req.body[type] === 'undefined' || typeof req.body.password === 'undefined'){
    res.json({error: 'Invalid '+type+' or password'}, 400); 
  }else{
    scope.findOrCreate(User, req.body, function(err, user){
      if (err) {
        res.json({ error: 'DB error' }, 500);
      }
      if (user) {
        var attempt = {user:user.id, ip: req.connection.remoteAddress};
        if(bcrypt.compareSync(req.body.password, user.password)){
          // password match
          attempt.successful = true;

          req.session.user = user;
          req.session.authenticated = true;
          res.json(user);
        }else{
          // invalid password
          attempt.successful = false;

          if (req.session.user) {
            req.session.user = null;
          }
          //maybe uncomment this later
          //scope.update(User, req.body[type], {loginAttempts: user.loginAttempts++}, function(){});
          res.json({ error: 'Invalid password' }, 400);
        }
        // log the attempt
        Attempt.create(attempt).done(function(){});
      } else {
        //TODO redirect to register
        res.json({ error: 'User not found' }, 404);
      }
    });
  }
};