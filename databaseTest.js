//lol i am on airplane so i dunno what test suite to use and cant look it up so
//gonna make it up as i go
var database = require("./database.js");

var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./db/exampleDB.db");
//import database from "./database.js";
var data = new database("testDB");

function printTableNames() {
  data.getTableNames((err, rows)=> {
    console.log("tables:");
    console.log(rows);
  })
}

var tests = [

  function testInitialize() {
    data.initialize(printTableNames);

    /*db.run("CREATE TABLE IF NOT EXISTS users (username TEXT primary key, password TEXT, firstName TEXT, lastName TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS projects (name TEXT primary key, description TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS userProjects (username TEXT, projectName TEXT, primary key(username, projectName))");

    db.all("SELECT name FROM sqlite_master WHERE type='table';", function(err, rows) {
      console.log("initializing tables:");
      console.log(rows);
      rows.forEach(function(row, index) {
        console.log(row.name);
      })
    });*/
  },
  function testDrop() {
    //this.data = new database("testDB");
    data.drop(printTableNames);

    /*db.run("DROP TABLE users");
    db.run("DROP TABLE projects");
    db.run("DROP TABLE userProjects");

    //i dunno how to check if table EXISTS
    console.log("tables:");
    db.all("SELECT name FROM sqlite_master WHERE type='table'", function(err, rows) {
      console.log("dropping");
      console.error(err);
      console.log(rows);
    });

    console.log("testing drop");*/
  },
  function reInitialize() {
    data.initialize();

    /*db.run("CREATE TABLE IF NOT EXISTS users (username TEXT primary key, password TEXT, firstName TEXT, lastName TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS projects (name TEXT primary key, description TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS userProjects (username TEXT, projectName TEXT, primary key(username, projectName))");

    db.all("SELECT name FROM sqlite_master WHERE type='table';", function(err, rows) {
      console.log("reinitializing");
      rows.forEach(function(row, index) {
        console.log(row.name);
      })
    });*/
  },
  function addUsers() {
    data.addUser("user1", "pass1", "bob", "boy");
    data.addUser("user2", "pass", "bob", "dude");
  },
  function getUsers() {
    data.getUsers(function(err, rows) {
      console.log(rows);
    });
  }
];

for(var i = 0; i < tests.length; i++) {
  tests[i]();       //lol this is actual valid syntax like wtf
}
