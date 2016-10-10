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

    it('should include all available variables', function(done){
      utils.getHtmlEmail({token: 'testValue'}).should
        .be.exactly('<h1>TEST</h1><div>url:http://localhost:1337/auth/reset?token=testValue</div><div>token:testValue</div><div>baseUrl:http://localhost:1337</div>');
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