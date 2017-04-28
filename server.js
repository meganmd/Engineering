var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var config = require('./serverConfig');
var database = require("./database.js");
var mode = app.settings.env;
var data = new database(config.database[mode]);

//data.drop();
var initialized = data.initialize();

app.get('/api/drop', function(request, response) {
  if(mode === 'test') {
    data.drop(function() {
      //response.setHeader('Content-Type');
      response.status(200).send();
    })
  } else {
    response.setHeader('Content-Type', 'application/json');
    response.status(400).send();
  }
})

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
  //console.log("Getting..." + username);
  data.getUser(request.query.username, function(err, row) {
    //console.log(row);
    response.setHeader('Content-Type', 'application/json');
    if(row != undefined){
      //console.log("Found")
      response.json(row);
    }else{
      //console.log("Not found")
      response.json({})
    }
  })
})

app.post('/api/addUser', function(request, response) {
  //console.log("Adding...");
  //console.log(request);
  //console.log(request.body);
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
  //console.log("Adding...");
  //console.log(request);
  //console.log(request.body);
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
  //console.log("Adding...");
  //console.log(request);
  //console.log(request.body);
  data.addUserProjectConnection(
    request.body.username,
    request.body.projectName,
    request.body.role,
    function(error) {
      if(error) {
        response.status(400).send("project name not unique!");               ///this isnt happening
      } else {
        //console.log("No error");
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
    //console.log(rows);
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  });
})

app.get('/api/acceptedProjects', function(request, response){
  data.getAcceptedProjectsByUser(request.query.username, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    //console.log(rows);
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  });
})

app.get('/api/unacceptedProjects', function(request, response){
  data.getUnacceptedProjectsByUser(request.query.username, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    //console.log(rows);
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  });
})


app.get('/api/project', function(request,response){
  //console.log("Getting..." + request.query.name);
  data.getProject(request.query.name, function(err, row){
    response.setHeader('Content-Type', 'application/json');
    //console.log(row);
    if(row != undefined){
      //console.log("Found");
      response.json(row);
    }else{
      //console.log("Not found");
      response.json({});
    }
  })
})

app.post('/api/acceptProjectInvitation', function(request, response) {
  //console.log("Accepting..." + request.body.projectName + " For..." + request.body.username);
  //console.log(request.body);
  data.acceptProject(request.body.username, request.body.projectName,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in accepting project");
      } else {
        //console.log("No error on accepting");
        response.status(200).end();
      }
  })
})

app.post('/api/rejectProjectInvitation', function(request, response) {
  //console.log("Rejecting..." + request.body.projectName + " For..." + request.body.username);
  data.deleteUserProjectConnection(request.body.username, request.body.projectName,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in rejecting project");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
  })
})

app.post('/api/deleteUser', function(request, response) {
  //console.log("Deleting...");
  //console.log(request.body);
  data.deleteUser(request.body.username)
  response.end();
})

app.get('/api/userFromProject', function(request, response) {
  //console.log("Retrieving " + request.query.username + " from " + request.query.projectTitle);
  data.getUserFromProject(request.query.projectTitle, request.query.username, function(err, row) {
    response.setHeader('Content-Type', 'application/json');
    if(row != undefined){
      //console.log("Found");
      response.json(row);
    }else{
      //console.log("Not found");
      response.json({});
    }
  })
})

app.get('/api/usersFromProject', function(request, response) {
  //console.log("Retrieving users from " + request.query.projectTitle);
  data.getProjectUsers(request.query.projectTitle, function(err, row) {
    response.setHeader('Content-Type', 'application/json');
    if(row != undefined){
      //console.log("Found");
      response.json(row);
    }else{
      //console.log("Not found");
      response.json({});
    }
  })
})

app.get('/api/listPBITable', function(request, response) {
  //console.log("Retrieving PBIs");
  data.listProductBacklogItemsTable(function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  })
})

app.get('/api/pbis', function(request, response) {
  //console.log("Retrieving PBIs for " + request.query.project);
  data.getProductBacklogItemsForProject(request.query.project, function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  })
})

app.get('/api/productBacklog', function(request, response) {
//  console.log("Retrieving product backlog for " + request.query.project);
  data.getProductBacklog(request.query.project, request.query.numSprints,function(err, rows) {
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  })
})

app.get('/api/sprintBacklog', function(request, response) {
  //console.log("Retrieving sprint backlog for " +
  //request.query.project + " sprint " + request.query.sprintNum);
  data.getSprintBacklog(request.query.project, request.query.sprintNum,
    function(err, rows) {
      response.setHeader('Content-Type', 'application/json');
      if(rows != undefined){
        //console.log("Found");
        response.json(rows);
      } else{
        //console.log("None found");
        response.json([]);
      }
    })
})

app.post('/api/addPBI', function(request, response) {
  data.incrementBacklog(function(error) {
    if(error) {
      console.log(error);
      response.status(400).send("Something went wrong in adding");
    } else {
      data.addProductBacklogItem(
        request.body.description, request.body.role, request.body.functionality,
        request.body.value, request.body.acceptanceCriteria, request.body.estimate,
        request.body.project,
        function(error){
          if(error) {
            console.log(error);
            response.status(400).send("Something went wrong in adding");
          } else {
            //console.log("No error");
            response.status(200).end();
          }
        })
      }
    })
})

app.post('/api/editPBI', function(request, response) {
  //console.log("Editing PBI...");
  data.updateProductBacklogItem(
    request.body.id, request.body.description, request.body.role,
    request.body.functionality, request.body.value,
    request.body.acceptanceCriteria, request.body.estimate,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in editing");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/movePBI', function(request, response) {
  //console.log("Moving PBI " + request.body.id + " to priority " + request.body.priority);
  data.moveProductBackLogItem(
    request.body.id, request.body.priority,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in moving");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/addPBIToSprint', function(request, response) {
  //console.log(request.body);
  //console.log("Adding PBI " + request.body.id + " to sprint " +
  //request.body.sprint + " for project " + request.body.projectName);
  data.addProductBacklogItemToSprint(request.body.id, request.body.projectName,
    request.body.sprint,
    function(error){
      if(error) {
        //console.log("ERROR");
        response.status(400).send("Something went wrong in adding to sprint");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/acceptPBI', function(request, response) {
  //console.log("Accepting PBI " + request.body.id + " for project " + request.body.projectName + " sprint " + request.body.sprint);
  data.acceptProductBackLogItem(
    request.body.id, request.body.projectName, request.body.sprint,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in accepting");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.post('/api/rejectPBI', function(request, response) {
  //console.log("Rejecting PBI " + request.body.id + " for project " +
  //request.body.projectName + " sprint " + request.body.sprint + " because " +
  //request.body.reason);
  data.rejectProductBackLogItem(
    request.body.id, request.body.projectName, request.body.sprint,
    request.body.reason,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in rejecting");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    }
  )
})

app.get('/api/PBITotalPercentage', function(request, response) {
  //console.log("Retrieving percentage for pbi..." + request.query.pbi);
  data.getTasksByPBI(request.query.pbi, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      var total = 0;
      for(var i = 0; i < rows.length; i++){
        total += rows[i].percent;
      }
      response.json(total);
    } else{
      //console.log("None found");
      response.json(0);
    }
  });
})

app.post('/api/addTask', function(request, response) {
  //console.log("Adding Task...");
  //console.log(request.body);
  data.addTask(
    request.body.project,
    request.body.sprint,
    request.body.pbi,
    request.body.description,
    request.body.percentage,
    request.body.member,
    request.body.columnNumber,
    request.body.priority,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in adding");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    })
})

app.post('/api/editTask', function(request, response) {
  //console.log("Editing Task...");
  //console.log(request.body);
  data.updateTask(
    request.body.id, request.body.pbi, request.body.description,
    request.body.percent, request.body.member,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in updating");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    })
})

app.post('/api/deleteTask', function(request, response) {
  //console.log("Deleting Task..." + request.body.id);
  data.deleteTask(request.body.id, function(error){
    if(error) {
      response.status(400).send("Something went wrong in deleting");
    } else {
      //console.log("No error");
      response.status(200).end();
    }
  })
})

app.post('/api/moveTask', function(request, response) {
  //console.log("Moving Task...");
  //console.log(request.body);
  data.moveTask(
    request.body.id, request.body.columnNumber, request.body.priority,
    function(error){
      if(error) {
        response.status(400).send("Something went wrong in moving");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    })
})

app.get('/api/tasksBySprint', function(request, response){
  //console.log("Getting tasks for project " + request.query.projectName + " sprint " + request.query.sprintNum);
  data.getTasksBySprint(request.query.projectName , request.query.sprintNum,
    function(err, rows){
      response.setHeader('Content-Type', 'application/json');
      if(rows != undefined){
        //console.log("Found");
        if(rows.constructor === Array){
          // console.log("ARRAY");
          response.json(rows);
        } else{
          var array = [rows];
          response.json(array);
        }
      } else{
        //console.log("None found");
        response.json([]);
      }
    });
})

app.get('/api/tasksBySprint2D', function(request, response){
  //console.log("Getting tasks for project " + request.query.projectName + " sprint " + request.query.sprintNum);
  data.getTasksBySprint(request.query.projectName , request.query.sprintNum,
    function(err, rows){
      response.setHeader('Content-Type', 'application/json');
      if(rows != undefined){
        //console.log("Found");
        if(rows.constructor === Array){
          var tasks = [[],[],[],[]];
          for(i = 0; i < rows.length; i++) {
            //console.log('task');
            //console.log(rows[i]);
            tasks[rows[i].columnNumber-1].push(rows[i]);
          }
          response.json(tasks);
        } else{
          var array = [rows];
          response.json(array);
        }
      } else{
        //console.log("None found");
        response.json([]);
      }
    });
})

app.get('/api/tasksByProject', function(request, response){
  data.getTasksByProject(request.query.projectName, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  });
})

app.post('/api/addSprint', function(request, response) {
  //console.log("Adding Sprint " + request.body.number + " to project " + request.body.project)
  data.addSprint(request.body.project, request.body.number, function(error){
    if(error) {
      response.status(400).send("Something went wrong in adding sprint");
    } else {
      //console.log("No error");
      response.status(200).end();
    }
  })
})

app.get('/api/sprints', function(request, response) {
  data.getSprints(request.query.project, function(err, rows){
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      //console.log("Found");
      response.json(rows);
    } else{
      //console.log("None found");
      response.json([]);
    }
  });
})

app.post('/api/moveSprintPBI', function(request, response) {
  //console.log("Moving sprint pbi " + request.body.id + " for project " + request.body.project +  " sprint " + request.body.sprintNum + " to row " + request.body.row)
  data.moveSprintPBI(request.body.id, request.body.project, request.body.sprintNum,
    request.body.row, function(error){
      if(error) {
        response.status(400).send("Something went wrong in moving");
      } else {
        //console.log("No error");
        response.status(200).end();
      }
    })
})
app.get('/api/percentBreakdownByPBI', function(request, response) {
  //console.log("Retrieving percent breakdown for " + request.query.pbi + " sprint " + request.query.sprint)
  data.getPercentBreakdownByPBI(request.query.pbi, request.query.sprint, function(err, rows){
    //console.log(rows);
    response.setHeader('Content-Type', 'application/json');
    if(rows != undefined){
      response.json(rows);
    } else{
      response.status(400).send();
    }
  });
})

app.post('/api/moveTaskNew', function(request, response) {
  //id, Column, Priority
  data.getTask(request.body.id, function(error, task) {
    if(error) {
      console.log(error);
      console.log("didn't get task");
      response.status(400).send("didn't get task");
    } else {
      data.incrementTasksInNewColumn(request.body.columnNumber, request.body.priority, function(error) {
        if(error) {
          console.log(error);
          console.log("didn't increment tasks in new column");
          response.status(400).send("didn't increment tasks in new column");
        } else {
          console.log(this.changes);
          data.moveTask(request.body.id, request.body.columnNumber, request.body.priority, function(error) {
            if(error) {
              console.log(error);
              console.log("didn't move task");
              response.status(400).send("didn't move task");
            } else {
              console.log(this.changes);
              data.decrementTasksInOldColumn(task.columnNumber, task.priority, function(error, rows) {
                if(error) {
                  console.log("didn't decrement tasks");
                  response.status(400).send("didn't decrement tasks");
                } else {
                  console.log(this.changes);
                  response.status(200).end();
                }
              })
            }
          })
        }
      })
    }
  })
})

var server = app.listen(config.port[app.settings.env], function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at %s/%s", host, port);
})
module.exports = server;
