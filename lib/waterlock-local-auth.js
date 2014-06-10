var path = require('path');

exports.installPath = path.normalize(__dirname+'/../../../');

exports.actions = require('./controllers');