'use strict';

var consolidate = require('consolidate');
var path = require('path');

/**
 * Returns the email template as html, it supports multiple engines with `consolidate.js`
 * @param  {Token} token
 * @return {String} html
 */
exports.getHtmlEmail = function(token){
  var config = require('./waterlock-local-auth').config;
  var authConfig = require('./waterlock-local-auth').authConfig;
  var tmplEngine = authConfig.passwordReset.template.engine || 'ejs'; // ejs is the default sails.js template engine
  if(typeof config === 'undefined'){
    throw new Error('No config file defined, try running [waterlock install config]');
  }

  var resetUrl;
  if (config.pluralizeEndpoints) {
    resetUrl = config.baseUrl + '/auths/reset?token='+token.token;
  }else {
    resetUrl = config.baseUrl + '/auth/reset?token='+token.token;
  }


  var viewVars = authConfig.passwordReset.template.vars;
  viewVars.url = resetUrl;

  var templatePath = path.resolve( __dirname, '../../../' + authConfig.passwordReset.template.file );


  return consolidate[tmplEngine](templatePath, viewVars);
};

/**
 * Callback for mailing operation
 * @param  {Object} error
 * @param  {Object} response
 */
exports.mailCallback = function(error, info){
   if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
};
