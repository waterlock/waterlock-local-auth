'use strict';

module.exports = {
  email: {
    type: 'email',
    required: true,
    unique: true
  },
  password: {
    type: 'STRING',
    minLength: 8,
    required: true
  },
};