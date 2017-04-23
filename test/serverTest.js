process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();


chai.use(chaiHttp);


describe('Blobs', function() {
  var users = [{
    username: "philidelphia",
    password: "pennslyvania",
    firstName: "phil",
    lastName: "penn"
  }, {
    username: "MickeyMouse",
    password: "mouse",
    firstName: "Michael",
    lastName: "Mouse",
  }];
  var server;
  var database;
  beforeEach(function (done) {
    database = require("../database.js");
    server = require('../server', { bustCache: true });
    done();
  });
  afterEach(function (done) {
    server.close(done);
  });
  // it('dropping to start with clean database', function(done) {
  //   var nothing = {
  //     username: "philidelphia",
  //     password: "pennslyvania",
  //     firstName: "phil",
  //     lastName: "penn"
  //   };
  //   chai.request(server)
  //   .post('/api/drop')
  //   .send(nothing)
  //   .end(function(err, res){
  //     console.log("res: " + res);
  //     console.log("err: " + err);
  //     res.should.have.status(200);
  //     done();
  //   })
  // })
  it('should list ALL users on /api/listUsers GET', function(done) {
    chai.request(server)
    .get('/api/listUsers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(0);
      done();
    });
  });
  it('should add user', function(done) {
    chai.request(server)
      .post('/api/addUser')
      .send(users[0])
      .end(function(err, res){
        res.should.have.status(200);
        //res.should.be.json;
        //res.body.should.be.a('object');
        //res.body.should.have.property('username');
        //res.body.should.have.property('password');
        //res.body.should.have.property('firstName');
        //res.body.should.have.property('lastName');
        //res.body.username.should.equal(newUser.username);
        //res.body.password.should.equal(newUser.password);
        done();
      });
  });
  it('should add users', function(done) {
    chai.request(server)
      .post('/api/addUser')
      .send(users[1])
      .end(function(err, res){
        res.should.have.status(200);
        //res.should.be.json;
        //res.body.should.be.a('object');
        //res.body.should.have.property('username');
        //res.body.should.have.property('password');
        //res.body.should.have.property('firstName');
        //res.body.should.have.property('lastName');
        //res.body.username.should.equal(newUser.username);
        //res.body.password.should.equal(newUser.password);
        done();
      });
  });
  it("shouldn't add a duplicate user", function(done) {
    chai.request(server)
      .post('/api/addUser')
      .send(users[0])
      .end(function(err, res){
        res.should.have.status(400);
        //res.should.be.json;
        //res.body.should.be.a('object');
        //res.body.should.have.property('username');
        //res.body.should.have.property('password');
        //res.body.should.have.property('firstName');
        //res.body.should.have.property('lastName');
        //res.body.username.should.equal(newUser.username);
        //res.body.password.should.equal(newUser.password);
        done();
      });
  });
  it('should list ALL users on /api/listUsers GET', function(done) {
    chai.request(server)
    .get('/api/listUsers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(2);
      res.body.should.eql(users);
      done();
    });
  });
  it('should get one user', function(done) {
    chai.request(server)
    .get('/api/user?username=' + users[1].username)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.eql(users[1]);
      done();
    });
  })

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
