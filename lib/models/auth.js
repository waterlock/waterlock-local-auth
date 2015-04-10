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
 */
exports.beforeCreate = function(values){
    if(typeof values.password !== 'undefined'){
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
        values.password= bcrypt.hashSync(values.password, salt);
  }
};

/**
 * used to update the password hash if user is trying to update password
 * @param  {object}   values
 */
exports.beforeUpdate = function(values){
  if(typeof values.password !== 'undefined'){
      var bcrypt = require('bcryptjs');
      var salt = bcrypt.genSaltSync(10);
      values.password = bcrypt.hashSync(values.password, salt);
  }
};