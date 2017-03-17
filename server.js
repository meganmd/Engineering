var express = require("express");
var app = express();
var fs = require("fs");
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./db/exampleDB.db");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(function() {
    db.run("DROP TABLE users");
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, firstName TEXT, lastName TEXT)");
    db.run("INSERT INTO users (username, password, firstName, lastName) VALUES (?, ?, ?, ?)", "user1", "pass1", "first", "last");
});

app.get('/api/listUsers', function(request, response) {

  db.all("SELECT * FROM users", function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
    });
})

app.get('/api/listUsernames', function(request, response) {

  db.all("SELECT username FROM users", function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
    });
})

app.get('/api/user', function(request,response) {
  username = request.query.username;
  console.log("Getting...");
  console.log(request.body);
  db.get("SELECT * FROM users where username = ?",username, function(err,row){
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
  db.run("INSERT INTO users (username, password, firstName, lastName) VALUES (?, ?, ?, ?)", request.body.username, request.body.password, request.body.firstName, request.body.lastName);
  response.end();
})

app.post('/api/deleteUser', function(request, response) {
  console.log("Deleting...");
  console.log(request.body);
  db.run("DELETE FROM users WHERE username=?",request.body.username);
  response.end();
})

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at %s/%s", host, port);
})
