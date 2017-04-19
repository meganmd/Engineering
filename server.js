var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var config = require('./serverConfig');
var database = require("./database.js");
var data = new database(config.database[app.settings.env]);

//data.drop();
data.initialize();


app.get('/api/listUsers', function(request, response) {
  data.getUsers(function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    response.json(rows);
  });
})

app.get('/api/listUsernames', function(request, response) {
  data.getUsernames(function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
  });
})

app.get('/api/user', function(request,response) {
  username = request.query.username;
  console.log("Getting..." + username);
  data.getUser(request.query.username, function(err, row) {
    console.log(row);
    response.setHeader('Content-Type', 'application/json');
    if(row != undefined){
      console.log("Found")
      response.json(row);
    }else{
      console.log("Not found")
      response.json({})
    }
  })
})

app.post('/api/addUser', function(request, response) {
  console.log("Adding...");
  //console.log(request);
  console.log(request.body);
  data.addUser(
    request.body.username,
    request.body.password,
    request.body.firstName,
    request.body.lastName,
    function(error) {
      if(error) {
        response.status(400).send("project name not unique!");               ///this isnt happening
      } else {
        response.status(200).end();
      }
    }
  )
})

app.post('/api/addProject', function(request, response) {
  console.log("Adding...");
  //console.log(request);
  console.log(request.body);
  data.addProject(
    request.body.name,
    request.body.description,
    function(error) {
      if(error) {
        response.status(400).send("project name not unique!");               ///this isnt happening
      } else {
        response.status(200).end();
      }
    }
  )
})

app.post('/api/addUserToProject', function(request, response) {
  console.log("Adding...");
  //console.log(request);
  console.log(request.body);
  data.addUserProjectConnection(
    request.body.username,
    request.body.projectName,
    request.body.role,
    function(error) {
      if(error) {
        response.status(400).send("project name not unique!");               ///this isnt happening
      } else {
        console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.get('/api/listProjects', function(request, response) {
  data.getProjects(function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
  });
})

app.get('/api/listProjectUsers', function(request, response) {
  data.listProjectUsers(function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
  });
})

app.get('/api/projects', function(request, response){
  data.getProjectsByUser(request.query.username, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    console.log(rows);
    if(rows != undefined){
      console.log("Found");
      response.json(rows);
    } else{
      console.log("None found");
      response.json([]);
    }
  });
})

app.get('/api/acceptedProjects', function(request, response){
  data.getAcceptedProjectsByUser(request.query.username, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    console.log(rows);
    if(rows != undefined){
      console.log("Found");
      response.json(rows);
    } else{
      console.log("None found");
      response.json([]);
    }
  });
})

app.get('/api/unacceptedProjects', function(request, response){
  data.getUnacceptedProjectsByUser(request.query.username, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    console.log(rows);
    if(rows != undefined){
      console.log("Found");
      response.json(rows);
    } else{
      console.log("None found");
      response.json([]);
    }
  });
})


app.get('/api/project', function(request,response){
  console.log("Getting..." + request.query.name);
  data.getProject(request.query.name, function(err, row){
    response.setHeader('Content-Type', 'application/json');
    console.log(row);
    if(row != undefined){
      console.log("Found");
      response.json(row);
    }else{
      console.log("Not found");
      response.json({});
    }
  })
})

app.post('/api/acceptProjectInvitation', function(request, response) {
  console.log("Accepting..." + request.body.projectName + " For..." + request.body.username);
  console.log(request.body);
  data.acceptProject(request.body.username, request.body.projectName,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in accepting project");
      } else {
        console.log("No error on accepting");
        response.status(200).end();
      }
  })
})

app.post('/api/rejectProjectInvitation', function(request, response) {
  console.log("Rejecting..." + request.body.projectName + " For..." + request.body.username);
  data.deleteUserProjectConnection(request.body.username, request.body.projectName,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in rejecting project");
      } else {
        console.log("No error");
        response.status(200).end();
      }
  })
})

app.post('/api/deleteUser', function(request, response) {
  console.log("Deleting...");
  console.log(request.body);
  data.deleteUser(request.body.username)
  response.end();
})

app.get('/api/userFromProject', function(request, response) {
  console.log("Retrieving " + request.query.username + " from " + request.query.projectTitle);
  data.getUserFromProject(request.query.projectTitle, request.query.username, function(err, row) {
    response.setHeader('Content-Type', 'application/json');
    if(row != undefined){
      console.log("Found");
      response.json(row);
    }else{
      console.log("Not found");
      response.json({});
    }
  })
})

app.get('/api/listPBITable', function(request, response) {
  console.log("Retrieving PBIs");
  data.listProductBacklogItemsTable(function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      console.log("Found");
      response.json(rows);
    } else{
      console.log("None found");
      response.json([]);
    }
  })
})

app.get('/api/pbis', function(request, response) {
  console.log("Retrieving PBIs for " + request.query.project);
  data.getProductBacklogItemsForProject(request.query.project, function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      console.log("Found");
      response.json(rows);
    } else{
      console.log("None found");
      response.json([]);
    }
  })
})

app.post('/api/addPBI', function(request, response) {
  console.log("Adding PBI...");
  console.log(request.body);
  data.addProductBacklogItem(
    request.body.description, request.body.role, request.body.functionality,
    request.body.value, request.body.acceptanceCriteria, request.body.estimate,
    request.body.columnNumber, request.body.rowNumber, request.body.project,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in adding");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    })
})

app.post('/api/editPBI', function(request, response) {
  console.log("Editing PBI...");
  data.updateProductBacklogItem(
    request.body.id, request.body.description, request.body.role,
    request.body.functionality, request.body.value,
    request.body.acceptanceCriteria, request.body.estimate,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in editing");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/movePBI', function(request, response) {
  console.log("Moving PBI " + request.body.id + " to " + request.body.columnNumber + " | " + request.body.rowNumber);
  data.moveProductBackLogItem(
    request.body.id, request.body.columnNumber, request.body.rowNumber,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in moving");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/addTask', function(request, response) {
  console.log("Adding Task...");
  console.log(request.body);
  data.addTask(
    request.body.project, request.body.pbi, request.body.description,
    request.body.percent, request.body.member, request.body.columnNumber,
    request.body.priority,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in adding");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    })
})

app.post('/api/editTask', function(request, response) {
  console.log("Editing Task...");
  console.log(request.body);
  data.updateTask(
    request.body.id, request.body.pbi, request.body.description,
    request.body.percent, request.body.member,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in updating");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    })
})

app.post('/api/moveTask', function(request, response) {
  console.log("Moving Task...");
  console.log(request.body);
  data.moveTask(
    request.body.id, request.body.columnNumber, request.body.priority,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in moving");
      } else {
        console.log("No error");
        response.status(200).end();
      }
    })
})

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at %s/%s", host, port);
})
module.exports = server;
