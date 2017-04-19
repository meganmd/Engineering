process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


describe('Blobs', function() {
  var server;
  beforeEach(function () {
    server = require('../server', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('should list ALL users on /api/listUsers GET', function(done) {
    chai.request(server)
    .get('/api/listUsers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      done();
    });
  });
  it('should list a SINGLE blob on /blob/<id> GET', function(done) {
    var newUser = {
      username: "philidelphia",
      password: "pennslyvania",
      firstName: "phil",
      lastName: "penn"
    };
    chai.request(server)
      .get('/api/user?username=' + newUser.username)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('username');
        res.body.should.have.property('password');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.username.should.equal(newUser.username);
        res.body.password.should.equal(newUser.password);
        done();
      });
  });
  it('should add a SINGLE blob on /blobs POST');
  it('should update a SINGLE blob on /blob/<id> PUT');
  it('should delete a SINGLE blob on /blob/<id> DELETE');
});


/*
var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('../server', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /', function testSlash(done) {
  request(server)
    .get('/api/listUsers')
    .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});*/
