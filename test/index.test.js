var should = require('should');

var index = require('../');
describe('index', function(){
  it('should export waterlock-local-auth', function(done){
    should.exist(index);
    done();
  });
})