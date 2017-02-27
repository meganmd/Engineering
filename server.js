var express = require("express");
var app = express();
var fs = require("fs");
var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./db/exampleDB.db");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(function() {
    //db.run("DROP TABLE users");
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
  //  db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user1", "pass1");
  //  db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user2", "pass2");
  //  db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user3", "pass3");
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

app.post('/api/addUser', function(request, response) {
  console.log("Adding...");
  //console.log(request);
  console.log(request.body);
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", request.body.username, request.body.password);
  response.end();
})

var server = app.listen(3001, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("app listening at %s/%s", host, port);
})
