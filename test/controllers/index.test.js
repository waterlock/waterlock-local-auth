var test_helper = require('../test_helper');
var should = test_helper.should;
var wl = test_helper.waterlock_local;
var index = wl.actions;

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