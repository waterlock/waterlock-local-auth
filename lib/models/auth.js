'use strict';

var _  = require('lodash');

exports.attributes = function(attr){
  var template = {
    email: {
      type: 'email',
      unique: true
    },
    password: {
      type: 'STRING',
      minLength: 8
    },
    resetToken: {
      model: 'resetToken'
    }
  };

  if(attr.username){
    delete(template.email);
  }

  _.merge(template, attr);
  _.merge(attr, template);
};

/**
 * used to hash the password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeCreate = function(values){
    if(!_.isUndefined(values.password)){
    var bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(values.password, salt);
    values.password = hash;
  }
};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values
 * @param  {Function} cb
 */
exports.beforeUpdate = function(values){
  if(!_.isUndefined(values.password) && values.password !== null){
    var bcrypt = require('bcrypt');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(values.password, salt);
    values.password = hash;
  }
};
