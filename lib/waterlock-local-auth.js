'use strict';

var path = require('path');

/**
 * [installPath description]
 * @type {[type]}
 */
exports.installPath = path.normalize(__dirname+'/../../../');

/**
 * [actions description]
 * @type {[type]}
 */
exports.actions = require('./controllers');

/**
 * [model description]
 * @type {[type]}
 */
exports.model = require('./models');