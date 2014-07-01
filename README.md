# Waterlock Local Auth

[![Build Status](http://img.shields.io/travis/davidrivera/waterlock-local-auth.svg?style=flat)](https://travis-ci.org/davidrivera/waterlock-local-auth) [![NPM version](http://img.shields.io/npm/v/waterlock-local-auth.svg?style=flat)](http://badge.fury.io/js/waterlock-local-auth) [![Dependency Status](http://img.shields.io/gemnasium/davidrivera/waterlock-local-auth.svg?style=flat)](https://gemnasium.com/davidrivera/waterlock-local-auth)

waterlock-local-auth is a module for [waterlock](http://waterlock.ninja/)
providing a local authentication method for users either based on username or email.

## Usage

```bash
npm install waterlock-local-auth
```

set the following option in your `waterlock.json` config file

```json
"authMethod":[
	{
		"name": "waterlock-local-auth",
		"passwordReset": {"EXPLAINED BELOW"}
	}
]
```
* `passwordReset` - object containing information regarding password resets
	* `tokens` - boolean if set to false password resets will be disabled
	* `mail` - object containing information about your smtp server, see nodemailer
		* `protocol` - the transport protocol
		* `options` - how it is use te transport method, see nodemailer
		* `from` - the from address 
		* `subject` - the email subject for password reset emails
		* `forwardUrl` - the url to send the user to after they have clicked the password reset link in their inbox (e.g. a form on your site which POST to `/user/reset`)
	* `template` - object containing template information for the reset emails
		* `file` - the relative path to the `jade` template for the reset emails
		* `vars` - object containing any vars you want passed to the template for rendering

## Password reset
Waterlock uses [nodemailer](http://www.nodemailer.com/) to send password reset emails. The options in the config file are applied to nodemailer as such
```js
var mail = config.passwordReset.mail;
nodemailer.createTransport(mail.protocol, mail.options);
```

if you choose to go with this option then a user upon visiting the url `/user/reset` with a post param of `email` will receieve an email at that address with the reset url. This url upon clicked with be validated against the server to ensure it's still within the time window allotted for a password reset. If so will set the `resetToken` session variable. After this if you have set a `forwardUrl` in your `waterlock.json` config file the user will be forwarded to this page.

If you want to take advantage of the built in reset itself have the page you sent your user to above `POST` to `/user/reset` with the post param of `password` If all is well a password reset will be issued.

## Template
You can customize the email template used in the password reset via the template file defined in `config/waterlock.json` this template file is rendered with the fun and dynamic `jade` markup, the view var `url` is generated and passed to it when a user requests and password reset. You can customize this template to your liking and pass any other view vars you wish to it via the `vars` options in the json file.

Your user can simply try to login to `/login` if the user is not found one will be created using [waterlines](https://github.com/balderdashy/waterline) `findOrCreate` method
