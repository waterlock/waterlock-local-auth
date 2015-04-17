'use strict';

var jade = require('jade');  
var path = require('path');

/**
 * Returns the email jade template as html
 * @param  {Token} token
 * @return {String} html
 */
exports.getHtmlEmail = function(token){
  var config = require('./waterlock-local-auth').config;
  var authConfig = require('./waterlock-local-auth').authConfig;
  if(typeof config === 'undefined'){
    throw 'No config file defined, try running [waterlock install config]';
  }
  
  var endpoint;
  
  if(config.pluralizeEndpoints){
    endpoint = '/auths';
  }else{
    endpoint = '/auth';
  }

  var resetUrl = config.baseUrl + endpoint + '/reset?token=' + token.token;

  var viewVars = authConfig.passwordReset.template.vars;
  viewVars.url = resetUrl;

  var templatePath = path.normalize(__dirname+'../../../'+authConfig.passwordReset.template.file);
  var html = jade.renderFile(templatePath, viewVars);

  return html;
};

/**
 * Callback for mailing operation
 * @param  {Object} error
 * @param  {Object} response
 */
exports.mailCallback = function(error, response){
   if(error){
        console.log(error);
    }else{
        console.log('Message sent: ' + response.message);
    }
};