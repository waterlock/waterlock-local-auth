'use strict';

var jwt = require('jwt-simple');
var _ = require('lodash');
var wl = require('../../waterlock-local-auth');

/**
 * Password reset action
 */
module.exports = function(req, res){

  var func;

  switch(req.method){
    case 'GET':
      func = handleGet;
      break;
    case 'POST':
      func = handlePost;
      break;
    default:
      res.json(404);
      break;
  }

  if(!_.isUndefined(func)){
    var params = allParams(req);
    func(req, res, sails, params);
  }
};

/**
 * gathers all params for this request
 * @param  object req the express request object
 * @return object     all params
 */
function allParams(req){
  var params = req.params.all();
  return _.merge(req.query, params);
}

/**
 * Handles the GET method for this request
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function handleGet(req, res, sails, params){
  validateToken(req, res, sails, params);
}

/**
 * Handles the POST method for this request
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function handlePost(req, res, sails, params){

  var func;

  if(!_.isUndefined(params.email)){
    func = sendEmail;
  }else if(!_.isUndefined(req.session.resetToken) &&
    req.session.resetToken &&
    !_.isUndefined(params.password)){
    func = issuePasswordReset;
  }

  if(!_.isUndefined(func)){
    func(req, res, sails, params);
  }else{
    res.json(404);
  }
}

/**
 * Begins the reset process by creating a new reset token
 * and sending an email to the user
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function sendEmail(req, res, sails, params){
  sails.models.auth.findOne({email: params.email}).populate('user').exec(function(err, a){
    if(a){
      sails.models.resettoken.create({owner: a.id}).exec(function(err, t){
        if(err){
          return res.serverError(err);
        }
        sails.models.auth.update({id: a.id}, {resetToken: t.id}).exec(function(err){
          if(err){
            return res.serverError(err);
          }
          res.json(200);
        });
      });
    } else {
      return res.forbidden('Email not found');
    }
  });
}

/**
 * Issues a password reset
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function issuePasswordReset(req, res, sails, params){
  sails.models.auth.findOne(req.session.resetToken.owner).populate('resetToken').exec(function(err, auth){
    if(err){
      return res.serverError(err);
    }

    // save token id before we destroy
    var tokenId = auth.resetToken.id;
    sails.models.auth.update({id:auth.id},{resetToken: null, password: params.password}).exec(function(err, auth){
      if(err){
        return res.serverError(err);
      }

      // destroy the token
      sails.models.resettoken.destroy(tokenId).exec(function(err){
        if(err){
          return res.serverError(err);
        }

        req.session.resetToken = false;
        res.json(auth);
      });
    });
  });
}

/**
 * validates a users token and redirects them to the new url if provided
 * @param  object req the express request object
 * @param  object res the express response object
 * @param  waterlineDAO User  the waterline User dao
 * @param  waterlineDAO ResetToken the waterline ResetToken dao
 * @param  object params all params for this request
 */
function validateToken(req, res, sails, params){
  var config = wl.config;
  var authConfig = wl.authConfig;
  if(params.token){
    try{
      // decode the token
      var _token = jwt.decode(params.token, config.jsonWebTokens.secret);

      // set the time of the request
      var _reqTime = Date.now();

      // If token is expired
      if(_token.exp <= _reqTime){
        return res.forbidden('Your token is expired.');
      }

      // If token is early
      if(_reqTime <= _token.nbf){
        return res.forbidden('This token is early.');
      }

      // If audience doesn't match
      if(config.jsonWebTokens.audience !== _token.aud){
        return res.forbidden('This token cannot be accepted for this domain.');
      }

      // If the subject doesn't match
      if('password reset' !== _token.sub){
        return res.forbidden('This token cannot be used for this request.');
      }

      sails.models.auth.findOne(_token.iss).populate('resetToken').exec(function(err, auth){
        if(typeof auth.resetToken === 'undefined' || params.token !== auth.resetToken.token){
          return res.forbidden('This token cannot be used.');
        }

        req.session.resetToken = auth.resetToken;

        if(authConfig.passwordReset.mail.forwardUrl){
          res.redirect(authConfig.passwordReset.mail.forwardUrl + '?token=' + auth.resetToken.token);
        }else{
          res.json(200);
        }

      });

    } catch(err){
      return res.serverError(err);
    }
  }else{
    //TODO limit attempts?
    req.session.resetToken = false;
    res.forbidden();
  }
}
