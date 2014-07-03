var proxyquire =  require('proxyquire')
  , should = require('should')
  , path = require('path')
  , waterlockPath = path.normalize(__dirname+'/waterlock.js')

var pathStub = {
  normalize: function(str){
    return waterlockPath;
  }
}

exports.waterlock_local = proxyquire.noCallThru().load('../lib/waterlock-local-auth', 
  { 
    'path': pathStub
  });

exports.proxyquire = proxyquire;
exports.should = should;