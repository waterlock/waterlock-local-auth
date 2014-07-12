
module.exports = exports = LocalAuth;


function LocalAuth(auth){
  this._auth = auth
  this._auth.type = 'local';
}


LocalAuth.prototype.validateRequest = function(req, cb){
  var params = req.params.all();
  if(typeof params[this.type] === 'undefined' || params.password === 'undefined'){
    cb('Invalid '+this.type+' or password');
  }

  cb(null);
};