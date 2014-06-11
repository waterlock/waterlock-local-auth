var should = require('should');

var index = require('../../lib/controllers');
describe('controller index', function(){
  it('should export login', function(done){
    index.should.have.property('login');
    index.login.should.be.Function;
    done();
  });
  it('should export logout', function(done){
    index.should.have.property('logout');
    index.logout.should.be.Function;
    done();
  });
})