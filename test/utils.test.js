var testHelper = require('./test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock_local;
var proxyquire = testHelper.proxyquire;

describe('utils',function(){
  var utils = proxyquire('../lib/utils',
    {
      './waterlock-local-auth': waterlock,
      'path': {
        normalize: function(str) {
          return __dirname+"/email.test.jade";
        }
      }
    });

  describe('getHtmlEmail', function(){
    it('should exist', function(done){
      utils.should.have.property('getHtmlEmail');
      done();
    });

    it('should return html', function(done){
      utils.getHtmlEmail({owner: "test", resetToken: "token"}).should.be.String
      done()
    });

    it('should error', function(done) {
      utils = proxyquire('../lib/utils', {'./waterlock-local-auth': {}});
      (function(){ utils.getHtmlEmail({owner: "test", resetToken: "token"})}).should.throwError('No config file defined, try running [waterlock install config]')
      done()
    });
  });

  describe('mailCallback', function(){
    it('should exist', function(done){
      utils.should.have.property('mailCallback');
      done();
    });
  });
});