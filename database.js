var sqlite = require("sqlite3").verbose();
var db = new sqlite.Database("./db/exampleDB.db");

db.serialize(function() {
    //db.run("DROP TABLE users");
    db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
//    db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user1", "pass1");
//    db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user2", "pass2");
//    db.run("INSERT INTO users (username, password) VALUES (?, ?)", "user3", "pass3");
});

function recreate() {
  db.run("DROP TABLE users");
  db.run("CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)");
}

function addUser(username, password) {
  db.run("INSERT INTO users (username, password) VALUES (?, ?)", username, password);
}

function getUsers() {   //not right
  db.all("SELECT * FROM users", function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
    });
}

function getUsernames() { //not right
  db.all("SELECT username FROM users", function(err, rows){
        response.setHeader('Content-Type', 'application/json');
        response.json(rows);
    });
}
