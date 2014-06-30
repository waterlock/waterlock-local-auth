'use strict';

/**
 * TODO these can be refactored later
 * @type {Object}
 */
var scopes = {
  username: function(authEvent){
    return {
      type: 'username',
      authEvent: authEvent,
      findOrCreate: function(attributes, req, cb){
        var attr = {
          username: attributes.username,
          method: 'local',
          password: attributes.password
        };
        this.authEvent.findOrCreate({username: attr.username}, attr, req.session.user, cb);
      }
    };   
  },
  email: function(authEvent){
    return {
      type: 'email',
      authEvent: authEvent,
      findOrCreate: function(attributes, req, cb){
        var attr = {
          email: attributes.email,
          method: 'local',
          password: attributes.password
        };
        this.authEvent.findOrCreate({email: attr.email}, attr, req.session.user, cb);
      }
    };
  }
};

module.exports = function(authEvent){
  var auth = authEvent.getModel('auth');
  var def = auth.definition;
  
  if(typeof def.email !== 'undefined'){
    return scopes.email(authEvent);
  }else if(typeof def.username !== 'undefined'){
    return scopes.username(authEvent);
  }else{
    throw 'Auth model must have either an email or username attribute';
  }  
}