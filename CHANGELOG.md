# v0.1.2-rc1
* [REFACTORING] [#36](https://github.com/waterlock/waterlock-local-auth/pull/36) update bcrypt version
* [REFACTORING] Replace for..in on lodash alternative 
* [BUG] [#33](https://github.com/waterlock/waterlock-local-auth/pull/33) Login should return 400 on E_VALIDATION error instead of 500
* [REFACTORING] Use _.isUndefined
* [REFACTORING] Removing protocal parameter from nodemailer.createTransport() 


# v0.0.6
* [BUG] upgraded bcrypt to enable on latest node 0.12
* [BUG] stop login action execution on serverError

# v0.0.5
* [REFACTORING] now using new waterlock api

# v0.0.4
* [REFACTORING] moved reset token from main project to here
* [REFACTORING] email resets now use jwt's instead of custom tokens

# v0.0.3
* [BUG] user should be signed in when trying to login with unknown user/passsword

# v0.0.2
* [FEATURE] now exporting default user model
