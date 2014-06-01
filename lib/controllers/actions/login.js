'use strict';

var installPath = require('../../waterlock-local-auth').installPath;
var user = require(installPath+'api/models/User');
var findOrCreate;
var type;

if(typeof user.attributes.email !== 'undefined'){
  type = 'email';
  findOrCreate = findOrCreateByEmail;
}else if(typeof user.attributes.username !== 'undefined'){
  type = 'username';
  findOrCreate = fincOrCreateByUsername;
}else{
  throw 'User model must have either an email or username attribute';
}

function findOrCreateByUsername(User, attributes, cb){
  User.findOrCreate({username: attributes.username}, attributes, cb);
}
function findOrCreateByEmail(User, attributes, cb){
  User.findOrCreate({email: attributes.email}, attributes, cb);
}

/**
 * Login action
 */
module.exports = function(req, res){
  var bcrypt = require('bcrypt');
  
  if(typeof req.body[type] === 'undefined' || typeof req.body.password === 'undefined'){
    res.json({error: 'Invalid '+type+' or password'}, 400); 
  }else{
    findOrCreate(User, req.body, function(err, user){
      if (err) {
        res.json({ error: 'DB error' }, 500);
      }
      if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)){
          // password match
            req.session.user = user;
            req.session.authenticated = true;
            res.json(user);
          }else{
            // invalid password
            if (req.session.user) {
              req.session.user = null;
            }

            res.json({ error: 'Invalid password' }, 400);
          }
      } else {
        //TODO redirect to register
        res.json({ error: 'User not found' }, 404);
      }
    });
  }
};