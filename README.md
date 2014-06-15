# Waterlock Local Auth

[![Build Status](http://img.shields.io/travis/davidrivera/waterlock-local-auth.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock-local-auth) [![NPM version](http://img.shields.io/npm/v/waterlock-local-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-local-auth) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock-local-auth.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock-local-auth)

waterlock-local-auth is a module for [waterlock](https://github.com/davidrivera/waterlock)
providing a local authentication method for users either based on username or email.

## Usage

```bash
npm install waterlock-local-auth
```

Your user can simply try to login to `/login` if the user is not found one will be created using [waterlines](https://github.com/balderdashy/waterline) `findOrCreate` method