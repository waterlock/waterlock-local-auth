'use strict';

exports.attributes = {
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

/**
 * used to hash the password
 * @param  {object}   values 
 * @param  {Function} cb     
 */
exports.beforeCreate = function(values){
    if(typeof values.password !== 'undefined'){
    var bcrypt = require('bcrypt-nodejs');
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
  if(typeof values.password !== 'undefined'){
    var bcrypt = require('bcrypt-nodejs');
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(values.password, salt);
    values.password = hash;
  }
};