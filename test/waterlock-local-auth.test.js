var should = require('should');
var proxyquire =  require('proxyquire');

var pathStub = {
  normalize: function(str){
    return "/some/path";
  }
};

var wl = proxyquire.noCallThru().load('../lib/waterlock-local-auth', { 'path': pathStub});

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