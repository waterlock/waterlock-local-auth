var test_helper = require('./test_helper');
var should = test_helper.should;
var wl = test_helper.waterlock_local;

describe('waterlock-local-auth', function(){
  it('should export install path', function(done){
    wl.should.have.property('installPath');
    wl.installPath.should.be.String;
    done();
  });
  it('should export actions', function(done){
    wl.should.have.property('actions');
    wl.actions.should.be.Object;
    done();
  });
})