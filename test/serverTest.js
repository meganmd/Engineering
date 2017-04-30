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
  var project = {
    name: "project1",
    description: "first project"
  };
  var userProject1 = {
    username: "philidelphia",
    projectName: "project1",
    role: "productOwner"
  };
  var userProject2 = {
    username: "MickeyMouse",
    projectName: "project1",
    role: "developmentTeam"
  };
  var pbi1 = {
    description: "this is a pbi",
    role: "?",
    functionality: "needs to do x",
    value: "x",
    acceptanceCriteria: "did x",
    estimate: "S",
    priority: 0,
    project: "project1",
  };
  var pbi2 = {
    description: "this is a pbi",
    role: "?",
    functionality: "needs to do x",
    value: "x",
    acceptanceCriteria: "did x",
    estimate: "S",
    priority: 0,
    project: "project1",
  };
  var sprint = {
    project:"project1",
    number:"1"
  };

  var task1 = {
    project: "project1",
    sprint: 1,
    pbi: "0",
    description: "am task 1",
    percentage: 45,
    member: "philidelphia",
    columnNumber: 1,
    priority: 0,
  };

  var task2 = {
    project: "project1",
    sprint: 1,
    pbi: "0",
    description: "am task 2",
    percentage: 45,
    member: "philidelphia",
    columnNumber: 1,
    priority: 1,
  };

  var task3 = {
    project: "project1",
    sprint: "1",
    pbi: "0",
    description: "am task 3",
    percentage: 45,
    member: "philidelphia",
    columnNumber: 1,
    priority: 2,
  };

  var task4 = {
    project: "project1",
    sprint:1,
    pbi:0,
    description:"task without stuff",
    columnNumber:1,
    priority: 3,
  }

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
  after(function(done) {
    var nothing = {
        username: "philidelphia",
        password: "pennslyvania",
        firstName: "phil",
        lastName: "penn"
      };
      chai.request(server)
      .get('/api/drop')
      .end(function(err, res){
        console.log("res: " + res);
        console.log("err: " + err);
        res.should.have.status(200);
        done();
      })
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
  it('should add another user', function(done) {
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
  it("shouldn't get nonexistant user", function(done) {
    chai.request(server)
    .get('/api/user?username=' + 'notauser')
    .end(function(err, res){
      res.should.have.status(400);
      done();
    });
  })
  it('should add project', function(done) {
    chai.request(server)
      .post('/api/addProject')
      .send(project)
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
  it("shouldn't add duplicate project", function(done) {
    chai.request(server)
      .post('/api/addProject')
      .send(project)
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
  it('should get project', function(done) {
    chai.request(server)
    .get('/api/project?name=' + project.name)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.eql(project);
      done();
    });
  })
  it("shouldn't get nonexistant project", function(done) {
    chai.request(server)
    .get('/api/project?name=' + "notaproject")
    .end(function(err, res){
      res.should.have.status(400);
      done();
    });
  })
  it("list projects", function(done) {
    chai.request(server)
    .get('/api/listProjects')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(1);
      res.body.should.eql([project]);
      done();
    });
  })
  it("adding Product Owner to project", function(done) {
    chai.request(server)
      .post('/api/addUserToProject')
      .send(userProject1)
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
  })
  it("can't add user to project twice", function(done) {
    chai.request(server)
      .post('/api/addUserToProject')
      .send(userProject1)
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
  })
  it("adding developmentTeam to project", function(done) {
    chai.request(server)
      .post('/api/addUserToProject')
      .send(userProject2)
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
  })
  it('list all projectusers', function(done) {
    chai.request(server)
    .get('/api/listProjectUsers')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      //console.log(res.body);
      res.body.should.have.lengthOf(2);
      done();
    });
  })

  it('add pbi', function(done) {
    chai.request(server)
    .post('/api/addPBI')
    .send(pbi1)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('add pbi', function(done) {
    chai.request(server)
    .post('/api/addPBI')
    .send(pbi2)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('check backlog', function(done) {
    chai.request(server)
    .get('/api/productbacklog?project=' + project.name)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(2);
      res.body[0].priority.should.equal(0);
      res.body[1].priority.should.equal(1);
      done();
    })
  })

  it('add sprint', function(done) {
    chai.request(server)
    .post('/api/addSprint')
    .send(sprint)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('add task 1', function(done) {
    chai.request(server)
    .post('/api/addTask')
    .send(task1)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('add task 2', function(done) {
    chai.request(server)
    .post('/api/addTask')
    .send(task2)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('add task 3', function(done) {
    chai.request(server)
    .post('/api/addTask')
    .send(task3)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('add task 4', function(done) {
    chai.request(server)
    .post('/api/addTask')
    .send(task4)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('check tasks', function(done) {
    chai.request(server)
    .get('/api/tasksByProject?projectName=' + project.name)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.should.have.lengthOf(4);
      //console.log(res.body);
      res.body[0].priority.should.equal(0);
      res.body[1].priority.should.equal(1);
      res.body[2].priority.should.equal(2);
      res.body[3].priority.should.equal(3);
      done();
    })
  })

  it('check tasks again', function(done) {
    chai.request(server)
    .get('/api/tasksBySprint2D?projectName=' + project.name + '&sprintNum=' + sprint.number)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body[0].should.have.lengthOf(4);
      //console.log(res.body);
      //res.body[0].priority.should.equal(0);
      //res.body[1].priority.should.equal(1);
      //res.body[2].priority.should.equal(2);
      done();
    })
  })

  it('move task', function(done) {
    var move ={
      id: 1,
      columnNumber: 2,
      priority: 0,
    }
    chai.request(server)
    .post('/api/moveTaskNew')
    .send(move)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('check tasks again', function(done) {
    chai.request(server)
    .get('/api/tasksBySprint2D?projectName=' + project.name + '&sprintNum=' + sprint.number)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      //console.log(res.body);
      res.body[0][0].priority.should.equal(0);
      res.body[1][0].priority.should.equal(0);
      done();
    });
  })

  it('move another task', function(done) {
    var move ={
      id: 2,
      columnNumber: 2,
      priority: 0,
    }
    chai.request(server)
    .post('/api/moveTaskNew')
    .send(move)
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  })

  it('check tasks again', function(done) {
    chai.request(server)
    .get('/api/tasksBySprint2D?projectName=' + project.name + '&sprintNum=' + sprint.number)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      //console.log(res.body);
      res.body[0][0].priority.should.equal(0);
      res.body[1][0].priority.should.equal(0);
      res.body[1][1].priority.should.equal(1);
      done();
    });
  })

  it("can't move incomplete task", function(done) {
    var move ={
      id: 4,
      columnNumber: 2,
      priority: 0,
    }
    chai.request(server)
    .post('/api/moveTaskNew')
    .send(move)
    .end(function(err, res) {
      res.should.have.status(400);
      done();
    });
  })

  it('check tasks again', function(done) {
    chai.request(server)
    .get('/api/tasksBySprint2D?projectName=' + project.name + '&sprintNum=' + sprint.number)
    .end(function(err, res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      //console.log(res.body);
      res.body[0][0].priority.should.equal(0);
      res.body[1][0].priority.should.equal(0);
      res.body[1][1].priority.should.equal(1);
      done();
    });
  })

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
