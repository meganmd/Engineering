
module.exports = class database {
  constructor(name) {
    var sqlite = require("sqlite3").verbose();
    this.db = new sqlite.Database("./db/" + name + ".db");
  }

  initialize(cb) {
    this.db.serialize(() => {
      this.db.run("CREATE TABLE IF NOT EXISTS users (username TEXT primary key, password TEXT, firstName TEXT, lastName TEXT)");
      this.db.run("CREATE TABLE IF NOT EXISTS projects (name TEXT primary key, description TEXT)");
      this.db.run("CREATE TABLE IF NOT EXISTS userProjects (username TEXT, projectName TEXT, primary key(username, projectName))");
      if(!(typeof cb === 'undefined')) {
        cb();
      };
    });
  }

  drop(cb) {
    this.db.serialize(() => {
      this.db.run("DROP TABLE users");
      this.db.run("DROP TABLE projects");
      this.db.run("DROP TABLE userProjects");
      if(!(typeof cb === 'undefined')) {
        cb();
      };
    });
  }

  getTableNames(cb) {
    this.db.all("SELECT name FROM sqlite_master WHERE type='table'", cb);
  }

  addUser(username, password, firstName, lastName, cb) {
    this.db.run("INSERT INTO users (username, password, firstName, lastName) VALUES (?, ?, ?, ?)", username, password, firstName, lastName, (error) => {
      if(error) cb(error);
    });
  }

  getUser(username, cb) {
    this.db.get("SELECT * FROM users where username = ?",username, cb);
  }

  deleteUser(username, cb) {
    this.db.run("DELETE FROM users where username = ?", username, cb);
  }

  getUsers(cb) {
    var users = [];
    this.db.all("SELECT * FROM users", cb);
    return users;
  }

  getUsernames(cb) { //not right
    this.db.all("SELECT username FROM users", cb);
  }

  addProject(name, description, cb) {
    this.db.run("INSERT INTO projects (name, description) VALUES (?, ?)", name, description, (error) => {
      if(error) cb(error);
    });
  }
}
