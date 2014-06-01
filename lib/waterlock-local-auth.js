var path = require('path');

exports.installPath = path.normalize(__dirname+"/../../../");

exports.version = '0.0.1';

exports.actions = require('./controllers');